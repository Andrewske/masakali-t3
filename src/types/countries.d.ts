export type CountryType = {
  id: number;
  name: string;
  iso_alpha2: string;
  isoAlpha3: string;
  isoNumeric: number;
  currency: {
    code: string;
    name: string;
  };
  flag: string;
};
