import { env } from '~/env.mjs';
import axios from 'axios';
import { prisma } from '~/db/prisma';

type ExchangeRatesResponse = {
  meta: {
    last_updated_at: Date;
  };
  data: {
    [key: string]: RateInfo;
  };
};

interface RateInfo {
  code: string;
  value: number;
}

const updateCurrency = async (code: string, rate_from_idr: number) => {
  try {
    const currency = await prisma.currency.findFirst({
      where: {
        code,
      },
      select: {
        id: true,
      },
    });

    if (!currency) {
      console.log('no_currency', code, rate_from_idr);
      throw new Error('Currency not found');
    }

    return await prisma.currency.update({
      where: {
        id: currency.id,
      },
      data: {
        rate_from_idr,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export async function GET() {
  try {
    const currencies = await prisma.currency.findMany({
      select: {
        code: true,
      },
    });

    // Constructing the currencies parameter as a URL-encoded string
    const currenciesParam = new URLSearchParams(
      currencies.map((c) => `currencies[]=${c.code}`).join('&')
    );

    // console.log(currenciesParam);

    const response: ExchangeRatesResponse = await axios.get(
      `https://api.currencyapi.com/v3/latest`,
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: env.CURRENCY_API_KEY,
        },
        params: {
          base_currency: 'IDR',
          currenciesParam, // Parsing the constructed parameters
        },
      }
    );

    const { data } = response.data;

    if (!data) {
      throw new Error('Exchange rates not found');
    }

    await Promise.all(
      Object.entries(data).map(([_, { code, value }]: [string, RateInfo]) => {
        return updateCurrency(code, Number(value));
      })
    );

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('GET', { err });
    return new Response(null, { status: 500 });
  }
}
