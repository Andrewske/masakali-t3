'use client';
import { useRef } from 'react';
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import { type FormData } from '../index';
import styles from './styles.module.scss';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { env } from '~/env.mjs';
import { addressComponentsToAddressObject } from '~/utils/googlePlaces';
import useKeyDown from '~/hooks/useKeyDown';
import FormInput from '../FormInput';

type AddressFormProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
};

const initialAddressState = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  zip_code: '',
};

export default function AddressForm({
  register,
  errors,
  setValue,
}: AddressFormProps) {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    placesService,
  } = usePlacesAutocompleteService({
    apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const result = getPlacePredictions({ input: value });
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (!isPlacePredictionsLoading) {
      getPlacePredictions({ input: value });
    } else {
      console.log('loading', value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    place_id?: string
  ) => {
    if (event.key === 'Enter' && place_id) {
      handleClick(place_id);
    }
  };

  const handleClick = (place_id: string) => {
    placesService?.getDetails({ placeId: place_id }, (details) => {
      if (details?.address_components) {
        console.log(details.address_components);
        const addressObj = addressComponentsToAddressObject(
          details.address_components
        );

        setValue('address.address1', addressObj.address1);
        setValue('address.city', addressObj.city);
        setValue('address.state', addressObj.state);
        setValue('address.country', addressObj.country);
        setValue('address.zip_code', addressObj.zip_code);
        getPlacePredictions({ input: '' });
      }
    });
  };

  const addressFormInputs = [
    { type: 'address.address1', label: 'Address', size: 'lg' },
    { type: 'address.address2', label: 'Apartment, suite, ect.', size: 'lg' },
    { type: 'address.city', label: 'City' },
    { type: 'address.state', label: 'State' },
    { type: 'address.country', label: 'Country/region' },
    { type: 'address.zip_code', label: 'Zip code' },
  ];

  return (
    <div className={styles.wrapper}>
      {addressFormInputs.map((input) => (
        <FormInput
          key={input.type}
          register={register}
          errors={errors}
          type={input.type as keyof FormData}
          label={input.label}
          onChange={onChange}
          size={input?.size ?? 'sm'}
        />
      ))}
    </div>
  );
}
