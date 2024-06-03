import { useMemo } from 'react';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';

type UseVillaPricingProps = {
  villaPricing: VillaPricingType[];
  checkin: Date;
  checkout: Date;
  adminDiscount?: boolean;
};

export const useVillaPricing = ({
  villaPricing,
  checkin,
  checkout,
  adminDiscount = false,
}: UseVillaPricingProps) => {
  const { conversionRates } = useCurrencyStore((state) => state);

  const conversionRateToUSD = conversionRates['USD'];

  return useMemo(
    () =>
      createPricingObject({
        villaPricing,
        checkin,
        checkout,
        conversionRate: conversionRateToUSD ?? 1,
        adminDiscount,
      }),
    [villaPricing, checkin, checkout, conversionRateToUSD, adminDiscount]
  );
};
