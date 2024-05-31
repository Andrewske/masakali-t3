import { prisma } from '~/db/prisma';
import fs from 'fs';

type Country = {
  name: string;
  isoAlpha2: string;
  isoAlpha3: string;
  isoNumeric: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  flag: string;
};

async function importCountries() {
  // Read the countries.json file
  const data = fs.readFileSync('countries.json', 'utf8');
  const countries = JSON.parse(data) as Country[];

  // Process each country in the JSON array
  for (const country of countries) {
    try {
      // Create a new currency entry if it doesn't already exist
      const currency = await prisma.currency.upsert({
        where: { code: country.currency.code },
        update: {},
        create: {
          code: country.currency.code,
          name: country.currency.name,
          symbol: country.currency.symbol,
        },
      });

      // Insert the country data into the database
      await prisma.country.create({
        data: {
          name: country.name,
          isoAlpha2: country.isoAlpha2,
          isoAlpha3: country.isoAlpha3,
          isoNumeric: Number(country.isoNumeric),
          currencyId: currency.id, // Associate the currency using its ID
          flag: Buffer.from(country.flag, 'base64'), // Convert base64 string to byte array
        },
      });
    } catch (error) {
      console.error(`Error inserting country: ${country.name}`, error);
    }
  }
}

importCountries().catch((e) => {
  throw e;
});
