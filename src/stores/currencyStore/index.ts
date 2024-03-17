import { createStore } from 'zustand/vanilla';
import { getCurrencyRates } from '~/actions/currencyApi';

import { countryCurrencies } from '~/lib/countryCurrencies';
import { countries, type CountryCodeType } from '~/lib/countries';

export type CurrencyState = {
  country: CountryType;
  currency: string;
  conversionRate: number;
  conversionRates: Record<string, number>;
};

export type CountryType = {
  id: number;
  name: string;
  isoAlpha2: string;
  isoAlpha3: string;
  isoNumeric: number;
  currency: {
    code: string;
    name: string;
    symbol: string | boolean;
  };
  flag: string;
};

export type CurrencyActions = {
  setCountry: (countryCode: CountryCodeType) => void;
  setCurrency: (currency: string) => void;
  conversionRate: number;
  setConversionRates: () => void;
};

export type CurrencyStore = CurrencyState & CurrencyActions;

export const initCurrencyStore = (): CurrencyState => {
  return {
    country: {} as CountryType,
    currency: '',
    conversionRate: 1,
    conversionRates: {},
  };
};

export const defaultInitialState: CurrencyState = {
  country: {
    id: 99,
    name: 'Indonesia',
    isoAlpha2: 'ID',
    isoAlpha3: 'IDN',
    isoNumeric: 360,
    currency: {
      code: 'IDR',
      name: 'Rupiah',
      symbol: 'Rp',
    },
    flag: 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEUwNDkxMDE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEUwNDkxMTE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRTA0OTBFMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRTA0OTBGMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+D76wCAAAAG9JREFUeNpiPCeo9pSBgUEKiD8z0AfwAvEzFiiDAYmmi+VMDAMERi0etZhmgOXP+w8DYzGbtOQ/KPsfHUP5H+Of9x/fAxkCQPyXThYzA/EHFmYBPmYkAXoB5tHsNGrxqMXUK7mgTR5eOjd9PgMEGACLNBM7Kx9mIgAAAABJRU5ErkJggg==',
  },
  currency: 'IDR',
  conversionRate: 1,
  conversionRates: {},
};

export const createCurrencyStore = (
  initState: CurrencyState = defaultInitialState
) => {
  return createStore<CurrencyStore>((set) => ({
    ...initState,
    // When a country is selected then we set the country, get the exchange rate
    setCountry: (countryCode: CountryCodeType) => {
      console.log('Setting country:', countryCode);
      const country = countries.find(
        (country) => country?.isoAlpha2 === countryCode
      ) as CountryType;
      set({
        country: country,
      });
      set({
        currency: (countryCurrencies as Record<string, string>)[countryCode],
      });
      getCurrencyRates()
        .then((data) => {
          console.log('Fetched currency rates:', data);
          if (data) {
            const rate = data[country.currency.code];
            console.log('Setting conversion rate:', rate, countryCode, data);
            set({ conversionRates: data });
            set({ conversionRate: rate });
          } else {
            console.error('Failed to fetch currency rates');
          }
        })
        .catch((error) => {
          console.error('Error fetching currency rates:', error);
        });
    },
    setConversionRates: () => {
      getCurrencyRates()
        .then((data) => {
          if (data) {
            set({ conversionRates: data });
          } else {
            console.error('Failed to fetch currency rates');
          }
        })
        .catch((error) => {
          console.error('Error fetching currency rates:', error);
        });
    },
    setCurrency: (currency: string) => {
      set({ currency });
    },
  }));
};
