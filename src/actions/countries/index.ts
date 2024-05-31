'use server';
import { prisma } from '~/db/prisma';

export type CountryType = {
  name: string;
  iso_alpha2: string;
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
          iso_alpha2: true,
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
          flag: country.flag.toString('base64'),
        }))
      );
    return countries;
  } catch (error) {
    console.error(error);
    return [] as CountryType[];
  }
};
