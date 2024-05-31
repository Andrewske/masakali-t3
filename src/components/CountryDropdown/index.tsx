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

const CountryDropdown = ({ countries }: { countries: CountryType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { country, setCountry } = useCurrencyStore((state) => state);

  const handleCountrySelection = async (country: CountryType) => {
    await setCountry(country.iso_alpha2 as CountryCodeType, countries);
  };

  const renderFlag = (flag: string) => {
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
      console.error('Invalid base64 flag:', flag);
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
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
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
            alt={country?.name ?? ''}
            width="0"
            height="0"
            className="w-6 h-5"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-[500px]">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No Countries Found</CommandEmpty>
          <ScrollArea>
            <CommandGroup>
              {countries &&
                countries.map((country: CountryType) => (
                  <CommandItem
                    key={country.name}
                    className="flex justify-between w-full"
                    onSelect={() => {
                      void handleCountrySelection(country);
                      setIsOpen(false);
                    }}
                  >
                    {country.name} {renderFlag(country.flag.toString())}
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;
