import type { addressType } from '~/types';

export const addressComponentsToAddressObject = (
  addressComponents: google.maps.GeocoderAddressComponent[]
): addressType => {
  const addressObj: addressType = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
  };

  addressComponents.forEach((component) => {
    const type = component.types[0];
    switch (type) {
      case 'route':
        addressObj.address1 = component.short_name ?? '';
        break;
      case 'locality':
        addressObj.city = component.short_name ?? '';
        break;
      case 'administrative_area_level_1':
        addressObj.state = component.short_name ?? '';
        break;
      case 'country':
        addressObj.country = component.long_name || '';
        break;
      case 'postal_code':
        addressObj.zip_code = component.long_name || '';
        break;
      default:
        break;
    }
  });

  return addressObj;
};
