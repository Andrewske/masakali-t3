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
  getValues,
}: AddressFormProps) {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    placesService,
  } = usePlacesAutocompleteService({
    apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  /**
   * Moves the focus down to the next list item.
   * @param listId - The id of the unordered list.
   */
  const moveFocusDown = (): void => {
    const listItems = document?.querySelector(`#predictions`)?.childNodes ?? [];
    const activeItem = document.activeElement as HTMLElement;

    for (let i = 0; i < listItems.length ?? 0; i++) {
      const listLength = listItems.length;
      if (
        activeItem === listItems[i] &&
        activeItem !== listItems[listLength - 1]
      ) {
        (listItems[i + 1] as HTMLElement).focus();
      }
    }
  };

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
    place_id?: string
  ) => {
    if (event.key === 'Enter' && place_id) {
      handleClick(place_id);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const listItem = document.activeElement?.nextSibling as HTMLElement;
      if (listItem) {
        console.log('down');
        listItem.focus();
      }
    }
    // if (event.key === 'ArrowUp') {
    //   event.currentTarget.previousSibling &&
    //     event.currentTarget.previousSibling.focus();
    // }
  };

  /**
   * Moves the focus up to the previous item in the menu.
   *
   * @param menuId - The ID of the menu element.
   */
  const moveFocusUp = (): void => {
    const listItems: NodeListOf<HTMLElement> =
      document.querySelectorAll(`#predictions`) ?? [];
    const activeItem: HTMLElement | null =
      document.activeElement as HTMLElement;
    for (let i = 0; i < listItems.length; i++) {
      if (activeItem === listItems[i] && activeItem !== listItems[0]) {
        (listItems[i - 1] as HTMLElement).focus();
      }
    }
  };

  const handleClick = (place_id: string) => {
    placesService?.getDetails({ placeId: place_id }, (details) => {
      if (details?.address_components) {
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

  const predictionValue = () => {
    if (placePredictions.length > 0) {
      let prediction = placePredictions[0]?.description ?? '';
      const inputValue = getValues('address.address1');
      return prediction.replace(
        inputValue,
        new Array(inputValue.length + 1).join(' ')
      );
    }
    return '';
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
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
        />
        {/* <input
          type="text"
          className={styles.autocomplete}
          disabled
          value={predictionValue()}
        /> */}
        {placePredictions.length > 0 && (
          <ul
            id="predictions"
            className={styles.predictions}
          >
            {placePredictions.map(({ description, place_id }, index) => (
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
        )}
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
        // onChange={(value) => onChange(value)}
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
        // onChange={(value) => onChange(value)}
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
        // onChange={(value) => onChange(value)}
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
        // onChange={(value) => onChange(value)}
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
        // onChange={(value) => onChange(value)}
      />
    </>
  );
}
