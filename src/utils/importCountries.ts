import { db } from '~/server/db';
import fs from 'fs';

type Country = {
  name: string;
  isoAlpha2: string;
  isoAlpha3: string;
  isoNumeric: string;
  currency: {
    code: string;
    name: string;
  };
  flag: string;
};

export async function importCountries() {
  // Read the countries.json file
  const data = fs.readFileSync('countries.json', 'utf8');
  const countries = JSON.parse(data) as Country[];

  // Process each country in the JSON array
  for (const country of countries) {
    try {
      // Create a new currency entry if it doesn't already exist
      const currency = await db.currency.upsert({
        where: { code: country.currency.code },
        update: {
          code: country.currency.code,
          name: country.currency.name,
        },
        create: {
          code: country.currency.code,
          name: country.currency.name,
        },
        select: {
          id: true,
        },
      });

      if (!country.isoAlpha2) {
        throw new Error('No ISO Alpha 2 code');
      }

      // Insert the country data into the database
      await db.country.upsert({
        where: {
          iso_alpha2: country.isoAlpha2,
        },
        update: {
          name: country.name,
          iso_alpha2: country.isoAlpha2,
          iso_alpha3: country.isoAlpha3,
          iso_numeric: Number(country.isoNumeric),
          currency_id: currency.id, // Associate the currency using its ID
          flag: Buffer.from(country.flag, 'base64'), // Convert base64 string to byte array
        },
        create: {
          name: country.name,
          iso_alpha2: country.isoAlpha2,
          iso_alpha3: country.isoAlpha3,
          iso_numeric: Number(country.isoNumeric),
          currency_id: currency.id, // Associate the currency using its ID
          flag: Buffer.from(country.flag, 'base64'), // Convert base64 string to byte array
        },
      });
    } catch (error) {
      console.log(country);
      console.error(`Error inserting country: ${country.name}`, error);
    }
  }
}
