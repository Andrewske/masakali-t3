// import { getCurrency } from '~/actions/currencyApi';
// import { NextResponse } from 'next/server';

// import { prisma } from '~/db/prisma';

// const currency_list = [
//   'JMD',
//   'JPY',
//   'JOD',
//   'KZT',
//   'KES',
//   'KWD',
//   'KGS',
//   'LAK',
//   'ANG',
//   'LSL',
//   'LRD',
//   'CHF',
//   'MKD',
//   'MGA',
//   'GBP',
//   'LKR',
//   'KRW',
//   'KPW',
//   'MDL',
//   'MAD',
//   'ETB',
//   'FKP',
//   'FJD',
//   'HTG',
//   'HNL',
//   'HKD',
//   'HUF',
//   'ISK',
//   'INR',
//   'IRR',
//   'IQD',
//   'ILS',
//   'GMD',
//   'GEL',
//   'GIP',
//   'GNF',
//   'GYD',
//   'DZD',
//   '',
//   'ARS',
//   'AWG',
//   'BSD',
//   'EUR',
//   'BZD',
//   'BTN',
//   'BWP',
//   'PYG',
//   'ZAR',
//   'QAR',
//   'SCR',
//   'RWF',
//   'SBD',
//   'YER',
//   'RUB',
//   'SEK',
//   'NZD',
//   'CRC',
//   'SOS',
//   'XPF',
//   'SGD',
//   'GTQ',
//   'SRD',
//   'SZL',
//   'THB',
//   'SYP',
//   'SHP',
//   'SLL',
//   'AFN',
//   'ALL',
//   'AOA',
//   'TWD',
//   'LBP',
//   'AMD',
//   'TTD',
//   'AUD',
//   'AZN',
//   'LYD',
//   'TND',
//   'MOP',
//   'MWK',
//   'TRY',
//   'MYR',
//   'MVR',
//   'BHD',
//   'BDT',
//   'TJS',
//   'BBD',
//   'BMD',
//   'MUR',
//   'MXN',
//   'BOB',
//   'BAM',
//   'UAH',
//   'NOK',
//   'UGX',
//   'TZS',
//   'TOP',
//   'VUV',
//   'UZS',
//   'BRL',
//   'BND',
//   'BGN',
//   'XOF',
//   'BIF',
//   'KHR',
//   'CAD',
//   'IDR',
//   'CVE',
//   'MMK',
//   'MNT',
//   'KYD',
//   'NGN',
//   'NAD',
//   'NIO',
//   'MZN',
//   'AED',
//   'PEN',
//   'PGK',
//   'NPR',
//   'UYU',
//   'PKR',
//   'PLN',
//   'OMR',
//   'PHP',
//   'PAB',
//   'WST',
//   'RSD',
//   'CLP',
//   'CNY',
//   'SAR',
//   'VND',
//   'RON',
//   'COP',
//   'KMF',
//   'HRK',
//   'CUP',
//   'CZK',
//   'CDF',
//   'DKK',
//   'DJF',
//   'DOP',
//   'EGP',
//   'SVC',
//   'ERN',
//   'XCD',
//   'USD',
//   'XAF',
//   'BYN',
//   'ZMW',
//   'STN',
//   'MRU',
//   'VES',
// ];

// type CurrencyData = {
//   symbol: string;
//   name: string;
//   symbol_native: string;
//   decimal_digits: number;
//   rounding: number;
//   code: string;
//   name_plural: string;
//   type: string;
//   countries: string[];
// };

// type RootData = {
//   [key: string]: CurrencyData;
// };

// type FullData = {
//   data: RootData;
// };

export function GET() {
  // const compare_currencies = async () => {
  //   const availableCurrencies = Object.values(jsonData.data).map(
  //     (currency) => currency['code']
  //   );

  //   const dbCurrencies = await prisma.currency
  //     .findMany({
  //       select: { code: true },
  //     })
  //     .then((currencies) => currencies.map((c) => c.code));

  //   console.log(dbCurrencies);

  //   function findDifferences(list1: string[], list2: string[]) {
  //     const set1 = new Set(list1);
  //     const set2 = new Set(list2);

  //     const onlyInList1 = Array.from(set1).filter((x) => !set2.has(x));
  //     const onlyInList2 = Array.from(set2).filter((x) => !set1.has(x));

  //     return { onlyInList1, onlyInList2 };
  //   }

  //   console.log(findDifferences(dbCurrencies, availableCurrencies));
  // };

  // await compare_currencies();

  return new Response(null, { status: 500 });
}
