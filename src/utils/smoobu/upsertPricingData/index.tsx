import { prisma } from '~/db/prisma';
import type { VillaPricingDataType } from '~/types/smoobu';

// Function to split an array into chunks
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Upsert pricing data into the database in chunks
const upsertPricingData = async (
  changedVillaPricing: VillaPricingDataType[]
) => {
  const upsertDataChunks = chunkArray(changedVillaPricing, 100);

  try {
    for (const chunk of upsertDataChunks) {
      await prisma.$transaction(
        chunk.map(({ villa_id, date, ...rest }) =>
          prisma.villa_pricing.upsert({
            where: { villa_id_date: { villa_id, date: new Date(date) } },
            update: { ...rest },
            create: { villa_id, date: new Date(date), ...rest },
          })
        )
      );
    }
  } catch (error) {
    console.error('Error during upsert:', error);
  }
};

export default upsertPricingData;
