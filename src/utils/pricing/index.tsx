import { WEBSITE_DISCOUNT, VAT_TAX } from '~/lib/constants';

export type VillaPricingType = {
  date: Date;
  price: number;
  available: boolean;
};

const calculatePricing = (prices: number[]) => {
  const numNights = prices.length;
  const subTotal = prices.reduce((acc, price) => acc + price, 0);
  const pricePerNight = subTotal / numNights;

  // Calculate discount
  const discount = subTotal * WEBSITE_DISCOUNT;
  // Calculate taxes
  const taxes = (subTotal - discount) * VAT_TAX;

  // Final price
  const finalPrice = subTotal - discount + taxes;

  return {
    pricePerNight,
    subTotal,
    discount,
    taxes,
    finalPrice,
    numNights,
  };
};

export const createPricingObject = ({
  villaPricing,
  checkin,
  checkout,
  conversionRate,
  adminDiscount,
}: {
  villaPricing: VillaPricingType[];
  checkin: Date;
  checkout: Date;
  conversionRate: number;
  adminDiscount?: boolean;
}) => {
  const pricesConverted = [];
  const pricesIDR = [];
  // console.log({ checkin, checkout });
  // Loop through each day between checkin and checkout

  for (
    let date = new Date(checkin);
    date <= checkout;
    date.setDate(date.getDate() + 1)
  ) {
    // Find the price for the current date
    const priceForDate = adminDiscount
      ? 1
      : villaPricing.find((item) => {
          const itemDate = new Date(item.date);
          const currentDate = date;

          // Compare only the year, month, and day parts
          return (
            itemDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
            itemDate.getUTCMonth() === currentDate.getUTCMonth() &&
            itemDate.getUTCDate() === currentDate.getUTCDate()
          );
        })?.price || 0;

    pricesIDR.push(priceForDate);
    pricesConverted.push(priceForDate * conversionRate);
  }

  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    calculatePricing(pricesConverted);
  const priceObjIdr = calculatePricing(pricesIDR);

  return {
    pricePerNight,
    subTotal,
    discount,
    taxes,
    finalPrice,
    numNights,
    totalIDR: priceObjIdr.finalPrice,
  };
};
