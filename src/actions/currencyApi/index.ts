'use server';
import { env } from '~/env.mjs';

type Currency = {
  currency: {
    meta: {
      last_updated_at: Date;
    };
  };
  data: {
    [key: string]: {
      code: string;
      value: number;
    };
  };
};

export const getCurrency = async (currency = 'USD', baseCurrency = 'IDR') => {
  try {
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apiKey: env.CURRENCY_API_KEY,
      },
    };

    const currenciesParam = currency ? `&currencies[]=${currency}` : '';

    const url = `https://api.currencyapi.com/v3/latest?base_currency=${baseCurrency}${currenciesParam}`;

    const response = await fetch(url, headers);

    const { data } = (await response.json()) as Currency;

    return data;
  } catch (err) {
    console.error('getCurrency', { err });

    return null;
  }
};

export const getConversionRate = async (currency = 'USD'): Promise<number> => {
  const currencyData = await getCurrency('IDR', currency);
  return currencyData?.['IDR']?.value ?? 1;
};

export const getCurrencyCountries = async () => {
  try {
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apiKey: env.CURRENCY_API_KEY,
      },
    };

    const url = `https://api.currencyapi.com/v3/countries`;

    const response = await fetch(url, headers);

    const { data } = (await response.json()) as Currency;

    return Object.values(data).map((country) => country?.code);
  } catch (err) {
    console.error('getCurrencyCountries', { err });

    return null;
  }
};
