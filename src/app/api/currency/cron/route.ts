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
      return;
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

async function getExchangeRates() {
  const currencies = await prisma.currency
    .findMany({
      select: {
        code: true,
      },
    })
    .then((currencies) => currencies.map((c) => c.code));

  const currenciesParam = currencies.join(',');

  try {
    const response = await axios.get(`https://api.currencyapi.com/v3/latest`, {
      headers: {
        'Content-Type': 'application/json',
        apiKey: process.env.CURRENCY_API_KEY,
      },
      params: {
        base_currency: 'IDR',
        currencies: currenciesParam,
      },
    });

    return response.data as ExchangeRatesResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response data:', error.response.data); // Log error response data
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export async function GET() {
  try {
    const response = await getExchangeRates();

    if (!response) {
      return new Response('Error getting exchange rates', { status: 500 });
    }

    const { data } = response;

    const batchSize = 10;
    const valuesArray = Object.values(data);

    // Create an array of arrays, where each inner array is a batch of size batchSize
    const batches = [];
    for (let i = 0; i < valuesArray.length; i += batchSize) {
      batches.push(valuesArray.slice(i, i + batchSize));
    }

    // Process each batch
    for (const batch of batches) {
      const promises = batch.map(({ code, value }) =>
        updateCurrency(code, value)
      );
      await Promise.all(promises);
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('GET', { err });
    return new Response(null, { status: 500 });
  }
}
