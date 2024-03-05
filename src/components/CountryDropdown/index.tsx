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
import type { CountryType } from '~/types/countries';
import { countries } from '~/lib/countries';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { ScrollArea } from '~/components/ui/scroll-area';

const CountryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { country, setCountry } = useCurrencyStore((state) => state);

  const handleCountrySelection = (country: CountryType) => {
    console.log('Selected Country:', country);
    setCountry(country.isoAlpha2);
  };

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
            height={20}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No Countries Found</CommandEmpty>
          <ScrollArea>
            <CommandGroup>
              {countries.map((country: CountryType) => (
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
                    height={20}
                  />
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
