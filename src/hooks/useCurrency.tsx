'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import countryData from '~/lib/countries.json';
import { getConversionRate } from '~/actions/currencyApi';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '~/components/ui/command';
type CountryType = {
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

const initialState: CountryType = {
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
};

const useCurrency = () => {
  const [currency, setCurrency] = useState('IDR');
  const [conversionRate, setConversionRate] = useState(1);
  const [country, setCountry] = useState<CountryType>(initialState);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams.has('currency') &&
      setCurrency(searchParams.get('currency') as string);
  }, [currency, searchParams]);

  const convertAmount = (amount: number) => {
    return amount / conversionRate;
  };

  const handleCountrySelection = async (country: CountryType) => {
    setCountry(country);
    const rate = await getConversionRate(country.currency.code);
    setConversionRate(rate);

    // Create a new search params object with the current parameters
    const newSearchParams = new URLSearchParams(searchParams);

    // Append the new currency parameter
    newSearchParams.set('currency', country.currency.code);

    // Update the search parameters in the URL
    router.push('/cart?' + newSearchParams.toString());
  };

  // const CountryDropdown = () => (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger className="flex gap-2 items-center">
  //       {country.currency.code}{' '}
  //       <Image
  //         src={`data:image/png;base64,${country.flag}`}
  //         alt={country.name}
  //         width={20}
  //         height={20}
  //       />
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent>
  //       <ScrollArea className="h-[400px] w-[350px] border">
  //         {countryData.map((country: CountryType) => (
  //           <DropdownMenuItem
  //             key={country.name}
  //             onClick={() => {
  //               void handleCountrySelection(country);
  //             }}
  //           >
  //             {country.name}{' '}
  //             <Image
  //               src={`data:image/png;base64,${country.flag}`}
  //               alt={country.name}
  //               width={20}
  //               height={20}
  //             />
  //           </DropdownMenuItem>
  //         ))}
  //       </ScrollArea>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );

  const CountryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    console.log({ isOpen });
    return (
      <Popover
        open={isOpen}
        onOpenChange={() => setIsOpen(true)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-[200px]  justify-between"
          >
            {country.currency.code}{' '}
            <Image
              src={`data:image/png;base64,${country.flag}`}
              alt={country.name}
              width={20}
              height="auto"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-[500px] p-0">
          <Command>
            <CommandInput placeholder="Search" />
            <CommandEmpty>No Countries Found</CommandEmpty>
            <CommandGroup>
              {countryData.map((country: CountryType) => (
                <CommandItem
                  key={country.name}
                  onSelect={() => {
                    void handleCountrySelection(country);
                    setIsOpen(false);
                  }}
                >
                  {country.name}{' '}
                  <Image
                    src={`data:image/png;base64,${country.flag}`}
                    alt={country.name}
                    width={20}
                    height="auto"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return {
    currency,
    setCurrency,
    convertAmount,
    CountryDropdown,
    conversionRate,
  };
};

export default useCurrency;
