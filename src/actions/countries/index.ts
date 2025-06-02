'use server';
import { db } from '~/server/db';
import { tryCatch } from '~/utils/tryCatch';
import { logAndPosthog } from '~/utils/posthogServerError';

export type CountryType = {
  name: string;
  iso_alpha2: string;
  currency: {
    code: string;
  };
  flag: string;
};

export const getCountries = async (): Promise<CountryType[] | null> => {
  const { data, error } = await tryCatch(
    db.country
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
          flag: Buffer.from(country.flag).toString('base64'),
        }))
      )
  );
  if (error) {
    await logAndPosthog({
      message: 'Error fetching countries',
      error,
      level: 'error',
      data: { location: 'getCountries' },
    });
  }
  return data;
};
