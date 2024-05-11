'use server';
import { prisma } from '~/db/prisma';

export type CountryType = {
  name: string;
  isoAlpha2: string;
  currency: {
    code: string;
  };
  flag: string;
};

export const getCountries = async (): Promise<CountryType[]> => {
  try {
    const countries = await prisma.country
      .findMany({
        select: {
          name: true,
          isoAlpha2: true,
          currency: {
            select: {
              code: true,
            },
          },
          flag: true,
        },
      })
      .then((countries) =>
        countries.map((country) => ({
          ...country,
          flag: country.flag.toString(),
        }))
      );
    return countries;
  } catch (error) {
    console.error(error);
    return [] as CountryType[];
  }
};
