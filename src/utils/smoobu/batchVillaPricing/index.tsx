import type {
  CurrentVillaPricingType,
  SmoobuRatesResponse,
  VillaPricingDataType,
} from '~/types/smoobu';
import { areDatesEqual } from '~/utils/helpers';
import transformSmoobuRatesResponse from '../transformSmoobuRatesResponse';
import { prisma } from '~/db/prisma';
import upsertPricingData from '../upsertPricingData';

const getChangedVillaPricing = (
  currentVillaPricing: CurrentVillaPricingType[],
  newVillaPricing: VillaPricingDataType[]
) => {
  const changedRecords: VillaPricingDataType[] = [];

  // TODO: Why not just loop through the newVillaPricing array and check if the currentVillaPricing array has a matching record?
  // First, check for changes in existing records
  for (const currentRecord of currentVillaPricing) {
    const correspondingRecord = newVillaPricing.find((record) => {
      return (
        record.villa_id === currentRecord.villa_id &&
        areDatesEqual(record.date, currentRecord.date)
      );
    });
    if (correspondingRecord) {
      // Check if there's a change in price or availability
      // if (correspondingRecord.villaId !== 1587920) {
      //   console.log(correspondingRecord);
      // }
      if (
        correspondingRecord.price !== currentRecord.price ||
        correspondingRecord.available !== currentRecord.available
      ) {
        // console.log({ correspondingRecord, currentRecord });
        changedRecords.push(correspondingRecord);
      }
    }
  }

  // Then, add any new records that do not have a corresponding entry in currentVillaPricing
  for (const newRecord of newVillaPricing) {
    const hasCorrespondingRecord = currentVillaPricing.some((currentRecord) => {
      return (
        currentRecord.villa_id === newRecord.villa_id &&
        areDatesEqual(newRecord.date, currentRecord.date)
      );
    });

    if (!hasCorrespondingRecord) {
      changedRecords.push(newRecord);
    }
  }

  return changedRecords;
};

export async function batchVillaPricing(data: SmoobuRatesResponse) {
  console.log('Starting batchVillaPricing');
  console.log('data:', data);

  // Transform incoming data to new villa pricing
  const newVillaPricing = transformSmoobuRatesResponse(data);

  // Retrieve current villa pricing from the database
  const currentVillaPricing: CurrentVillaPricingType[] =
    await prisma.villa_pricing.findMany();

  // Determine pricing changes
  const changedVillaPricing = getChangedVillaPricing(
    currentVillaPricing,
    newVillaPricing
  );

  // Upsert changed pricing into the database
  try {
    await upsertPricingData(changedVillaPricing);
    console.log('Upserted pricing data successfully');
  } catch (error) {
    console.error('Error during upsert:', error);
  }
}
