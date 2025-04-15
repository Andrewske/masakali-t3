import { useState } from 'react';
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
import Image from 'next/image';
import type { CountryType } from '~/actions/countries';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { ScrollArea } from '~/components/ui/scroll-area';
import { type CountryCodeType } from '~/lib/countryCurrencies';
import { useCallback, useMemo, memo } from 'react';

const CountryDropdown = ({ countries }: { countries: CountryType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { country, setCountry } = useCurrencyStore((state) => state);

  const handleCountrySelection = useCallback(
    async (selectedCountry: CountryType) => {
      await setCountry(
        selectedCountry.iso_alpha2 as CountryCodeType,
        countries
      );
    },
    [setCountry, countries]
  );

  const renderFlag = useCallback(
    (flag: string) => {
      try {
        // Attempt to decode the base64 string to check if it's valid
        atob(flag);
        return (
          <Image
            src={`data:image/png;base64,${flag}`}
            alt={country?.name ?? ''}
            width="0"
            height="0"
            className="w-6 h-5"
          />
        );
      } catch (error) {
        console.error('Invalid base64 flag:', flag, { error });
        // Return a default image or null if the base64 string is invalid
        return (
          <Image
            src="/path/to/default/image.png"
            alt="Default"
            width="0"
            height="0"
            className="w-6 h-5"
          />
        );
      }
    },
    [country]
  );

  const onOpenChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (selectedCountry: CountryType) => {
      void handleCountrySelection(selectedCountry);
      setIsOpen(false);
    },
    [handleCountrySelection]
  );

  const memoizedButton = useMemo(
    () => (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className=""
      >
        {country.currency.code}{' '}
        <Image
          src={`data:image/png;base64,${country.flag}`}
          alt={country?.name ?? ''}
          width="0"
          height="0"
          className="w-6 h-5"
        />
      </Button>
    ),
    [isOpen, country]
  );

  const memoizedCountries = useMemo(
    () =>
      countries &&
      countries.map((country: CountryType, index: number) => (
        <CommandItem
          key={country?.name + '-' + index}
          className="flex justify-between w-full"
          onSelect={() => handleSelect(country)}
        >
          {country.name} {renderFlag(country.flag.toString())}
        </CommandItem>
      )),
    [countries, handleSelect, renderFlag]
  );

  return (
    <Popover
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger asChild>{memoizedButton}</PopoverTrigger>
      <PopoverContent className="w-[200px] h-[500px]">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No Countries Found</CommandEmpty>
          <ScrollArea>
            <CommandGroup>{memoizedCountries}</CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default memo(CountryDropdown);
