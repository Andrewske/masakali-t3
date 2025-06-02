'use client';
import { memo, useCallback } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { type UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import type { FieldName, FormData } from '../getFormSchema';
interface AddressFormProps {
  form: UseFormReturn<FormData>;
}

interface FieldProps {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string | undefined;
  setValue: (name: FieldName, value: string | undefined) => void;
}

const Field = ({ name, label, placeholder, value, setValue }: FieldProps) => (
  <FormField
    name={name}
    render={() => (
      <FormItem>
        <FormLabel className="font-montserrat uppercase">{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(name, e.target.value)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const AddressForm = memo(({ form }: AddressFormProps) => {
  const { watch, setValue }: UseFormReturn<FormData> = form;

  const address1 = watch('address.address1');
  const address2 = watch('address.address2');
  const city = watch('address.city');
  const country = watch('address.country');
  const region = watch('address.region');
  const zip_code = watch('address.zip_code');

  const handleCountryChange = useCallback(
    (val: string) => setValue('address.country', val),
    [setValue]
  );

  const handleRegionChange = useCallback(
    (val: string) => setValue('address.region', val),
    [setValue]
  );

  const renderCountryField = useCallback(
    () => (
      <FormItem className="col-span-1">
        <FormLabel className="font-montserrat uppercase">Country</FormLabel>
        <FormControl>
          <CountryDropdown
            valueType="short"
            value={country}
            className="bg-white w-full border-0 rounded p-2"
            onChange={handleCountryChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [country, handleCountryChange]
  );

  const renderRegionField = useCallback(
    () => (
      <FormItem className="col-span-1">
        <FormLabel className="font-montserrat uppercase">Region</FormLabel>
        <FormControl>
          <RegionDropdown
            countryValueType="short"
            country={country}
            value={region}
            className="bg-white w-full border-0 rounded p-2"
            onChange={handleRegionChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [country, region, handleRegionChange]
  );
  return (
    <div>
      <Field
        name="address.address1"
        label="Address 1"
        placeholder="Address 1"
        value={address1}
        setValue={setValue}
      />
      <Field
        name="address.address2"
        label="Apt/Suite/etc (optional)"
        placeholder="Apt/Suite/Other"
        value={address2}
        setValue={setValue}
      />
      <span className="grid grid-cols-2 gap-1 py-2">
        <Field
          name="address.city"
          label="City"
          placeholder="City"
          value={city}
          setValue={setValue}
        />

        <FormField
          name="address.country"
          render={renderCountryField}
        />
      </span>
      <span className="grid grid-cols-2 gap-1 py-2">
        <FormField
          name="address.region"
          render={renderRegionField}
        />
        <Field
          name="address.zip_code"
          label="Zip Code"
          placeholder="Zip Code"
          value={zip_code}
          setValue={setValue}
        />
      </span>
    </div>
  );
});

export default memo(AddressForm);
