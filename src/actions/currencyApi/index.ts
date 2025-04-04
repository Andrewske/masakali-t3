'use server';
import { db } from '~/server/db';

// import { env } from '~/env';

// import type { CountryCodeType } from '~/lib/countryCurrencies';
// type Currency = {
//   currency: {
//     meta: {
//       last_updated_at: Date;
//     };
//   };
//   data: {
//     [key: string]: {
//       code: string;
//       value: number;
//       currencies: string[];
//     };
//   };
// };

export const getRateFromIdr = async (
  currency = 'USD'
): Promise<number | null> => {
  try {
    const rate = await dbcurrency.findFirst({
      where: {
        code: currency,
      },
      select: {
        rate_from_idr: true,
      },
    });

    if (!rate) {
      throw new Error('Rate not found');
    }

    return rate.rate_from_idr;
  } catch (error) {
    console.log(error);
    return null; // Explicitly returning null in case of an error
  }
};

// export const getCurrency = async (currency = 'USD', baseCurrency = 'IDR') => {
//   try {
//     const headers = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         apiKey: env.CURRENCY_API_KEY,
//       },
//     };

//     const currenciesParam = currency ? `&currencies[]=${currency}` : '';

//     const url = `https://api.currencyapi.com/v3/latest?base_currency=${baseCurrency}${currenciesParam}`;

//     const response = await fetch(url, headers);

//     const { data } = (await response.json()) as Currency;

//     return data;
//   } catch (err) {
//     console.error('getCurrency', { err });

//     return null;
//   }
// };

// export const getConversionRate = async (currency = 'USD'): Promise<number> => {
//   const currencyData = await getCurrency('IDR', currency);
//   return currencyData?.['IDR']?.value ?? 1;
// };

// export const getCurrencyRates = async (currency = 'IDR') => {
//   try {
//     const headers = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         apiKey: env.CURRENCY_API_KEY,
//       },
//     };

//     const url = `https://api.currencyapi.com/v3/latest?base_currency=${currency}`;

//     const response = await fetch(url, headers);

//     const { data } = (await response.json()) as Currency;

//     const mappedResponse: Record<CountryCodeType, number> = Object.entries(
//       data
//     ).reduce((acc, [key, value]) => {
//       acc[key] = value.value;
//       return acc;
//     }, {} as Record<string, number>);

//     return mappedResponse;
//   } catch (err) {
//     console.error('getCurrencyRates', { err });

//     return null;
//   }
// };

// export const getCountryCurrencies = async () => {
//   try {
//     const headers = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         apiKey: env.CURRENCY_API_KEY,
//       },
//     };

//     const url = `https://api.currencyapi.com/v3/currencies`;

//     const response = await fetch(url, headers);

//     const { data } = (await response.json()) as Currency;

//     const mappedResponse: Record<string, string> = Object.entries(
//       data // Use 'data' instead of 'response'
//     ).reduce((acc, [key, value]) => {
//       acc[key] = value.currencies[0] ?? '';
//       return acc;
//     }, {} as Record<string, string>);

//     return mappedResponse;
//   } catch (err) {
//     console.error('getCountryCurrencies', { err });

//     return null;
//   }
// };

// export const getCurrencyCountries = async () => {
//   try {
//     const headers = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         apiKey: env.CURRENCY_API_KEY,
//       },
//     };

//     const url = `https://api.currencyapi.com/v3/countries`;

//     const response = await fetch(url, headers);

//     const { data } = (await response.json()) as Currency;

//     return Object.values(data).map((country) => country?.code);
//   } catch (err) {
//     console.error('getCurrencyCountries', { err });

//     return null;
//   }
// };
