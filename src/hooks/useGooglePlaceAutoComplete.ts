import { type AutocompletePrediction } from 'google.maps.places';

interface Address {
  address1: string;
  locality: string;
  adminArea1Short: string;
  adminArea1Long: string;
  postalCode: string;
  countryShort: string;
  countryLong: string;
}

const useGooglePlaceAutoComplete = () => {
  const initAutoComplete = async (
    input: HTMLInputElement,
    callback: () => void
  ) => {
    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: ['us', 'ca'] },
      fields: ['address_component', 'geometry'],
      types: ['address'],
    });
    autoComplete.addListener('place_changed', callback);

    return autoComplete;
  };

  const getFullAddress = async (
    autoComplete: google.maps.places.Autocomplete
  ) => {
    const place: google.maps.places.PlaceResult = autoComplete.getPlace();

    let address1 = '',
      locality = '',
      adminArea1Short = '',
      adminArea1Long = '',
      countryShort = '',
      countryLong = '',
      postalCode = '';

    for (const component of place.address_components as AutocompletePrediction[]) {
      const componentType = component.types[0];

      if (componentType === 'street_number') {
        address1 = component.long_name;
      }
      if (componentType === 'route') {
        address1 = `${address1} ${component.long_name}`;
      }
      if (componentType === 'locality') {
        locality = component.long_name;
      }
      if (componentType === 'administrative_area_level_1') {
        adminArea1Short = component.short_name;
        adminArea1Long = component.long_name;
      }
      if (componentType === 'postal_code') {
        postalCode = component.long_name;
      }
      if (componentType === 'postal_code_suffix') {
        postalCode = `${postalCode}-${component.long_name}`;
      }
      if (componentType === 'country') {
        countryShort = component.short_name;
        countryLong = component.long_name;
      }
    }

    const resAddress: Address = {
      address1,
      locality,
      adminArea1Short,
      adminArea1Long,
      postalCode,
      countryShort,
      countryLong,
    };

    return resAddress;
  };

  return {
    initAutoComplete,
    getFullAddress,
  };
};

export default useGooglePlaceAutoComplete;
