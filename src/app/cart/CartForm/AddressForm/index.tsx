'use client';
import { useState } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { type FormData } from '../index';
import styles from './styles.module.scss';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { env } from '~/env.mjs';
import { addressComponentsToAddressObject } from '~/utils/googlePlaces';

type AddressFormProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const initialAddressState = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  zip_code: '',
};

export default function AddressForm({ register, errors }: AddressFormProps) {
  const [address, setAddress] = useState(initialAddressState);

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
      console.log(placePredictions);
    } else {
      console.log('loading', value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    place_id: string
  ) => {
    if (event.key === 'Enter') {
      handleClick(place_id);
    }
  };

  const handleClick = (place_id: string) => {
    placesService?.getDetails({ placeId: place_id }, (details) => {
      if (details?.address_components) {
        const addressObj = addressComponentsToAddressObject(
          details.address_components
        );

        setAddress({
          ...address,
          ...addressObj,
        });
      }
    });
  };

  return (
    <>
      <label
        className={styles.label ?? ''}
        htmlFor="address1"
      >
        Address
      </label>
      <span className={styles.autoCompleteContainer}>
        <input
          {...register('address.address1', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          name="address1"
          aria-invalid={errors.address ? 'true' : 'false'}
          className={`${errors.address ? styles.error ?? '' : ''} ${
            styles.address ?? ''
          }`}
          onChange={(value) => onChange(value)}
        />
        <ul>
          {placePredictions &&
            placePredictions.map(({ description, place_id }, index) => (
              <li
                className={styles.prediction}
                key={place_id}
                autoFocus={index === 0}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) =>
                  handleKeyDown(e, place_id)
                }
                onClick={() => handleClick(place_id)}
              >
                {description}
              </li>
            ))}
        </ul>
      </span>
      <label
        className={styles.label}
        htmlFor="address2"
      >
        Apartment, suite, ect.
      </label>
      <input
        {...register('address.address2', {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        name="address2"
        aria-invalid={errors.email ? 'true' : 'false'}
        className={`${errors.email ? styles.error ?? '' : ''} ${
          styles.address ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
      <label
        className={styles.label ?? ''}
        htmlFor="city"
      >
        City
      </label>
      <input
        {...register('address.city', {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        name="city"
        aria-invalid={errors.email ? 'true' : 'false'}
        className={`${errors.email ? styles.error ?? '' : ''} ${
          styles.address ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
      <label
        className={styles.label ?? ''}
        htmlFor="state"
      >
        State or province
      </label>
      <input
        {...register('address.state', {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        className={`${errors.email ? styles.error ?? '' : ''} ${
          styles.address ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
      <label
        className={styles.label ?? ''}
        htmlFor="country"
      >
        Country/region
      </label>
      <input
        {...register('address.country', {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        className={`${errors.email ? styles.error ?? '' : ''} ${
          styles.address ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
      <label
        className={styles.label ?? ''}
        htmlFor="zip_code"
      >
        Zip/postal code
      </label>
      <input
        {...register('address.zip_code', {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        className={`${errors.email ? styles.error ?? '' : ''} ${
          styles.address ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
    </>
  );
}
