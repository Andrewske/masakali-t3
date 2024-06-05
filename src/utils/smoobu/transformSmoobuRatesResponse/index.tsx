import type { SmoobuRatesResponse, VillaPricingDataType } from '~/types/smoobu';

const transformSmoobuRatesResponse = (data: SmoobuRatesResponse['data']) => {
  const transformedData: VillaPricingDataType[] = [];

  for (const villaId in data) {
    for (const date in data[villaId]) {
      const pricingData = data?.[villaId]?.[date];

      if (pricingData?.price && pricingData?.available !== null) {
        const newRecord: VillaPricingDataType = {
          villa_id: parseInt(villaId),
          date,
          price: pricingData.price,
          available: Boolean(pricingData.available),
        };

        transformedData.push(newRecord);
      }
    }
  }

  return transformedData;
};

export default transformSmoobuRatesResponse;
