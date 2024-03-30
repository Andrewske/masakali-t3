import { z } from 'zod';
import { type VillaNamesType } from '~/lib/villas';
import { villaDetails } from '~/lib/villas';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  adults: z.number().min(1, 'At least one adult is required'),
  children: z.number().min(0, 'Children count cannot be negative'),
  address: z.object({
    address1: z.string().min(1, 'Address line 1 is required'),
    address2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    region: z.string().min(1, 'Region is required'),
    country: z.string().min(1, 'Country is required'),
    zip_code: z.string().min(1, 'ZIP code is required'),
  }),
  cc_number: z.string().min(16, 'Credit card number is required'),
  cc_expiry: z.string().min(5, 'Expiry date is required'),
  cc_cvc: z.string().min(3, 'CVC is required'),
});

export type FormData = z.infer<typeof formSchema>;

export type FieldName =
  | 'address'
  | 'children'
  | 'email'
  | 'fullName'
  | 'phone'
  | 'adults'
  | 'address.address1'
  | 'address.address2'
  | 'address.city'
  | 'address.region'
  | 'address.country'
  | 'address.zip_code'
  | 'cc_number'
  | 'cc_expiry'
  | 'cc_cvc';

const getFormSchema = (villaName: VillaNamesType) => {
  return formSchema.refine(
    (data) => {
      // Look up the limits for the selected villa
      const {
        maxGuests: { adults: maxAdults, children: maxChildren },
      } = villaDetails[villaName];

      // Validate the total number of guests, adults, and children against the limits
      return (
        data.adults + data.children <= maxAdults + maxChildren &&
        data.adults <= maxAdults &&
        data.children <= maxChildren
      );
    },
    {
      message:
        'Exceeded maximum number of guests, adults, or children for this villa',
      path: ['adults', 'children'], // specify the fields this error is related to
    }
  );
};

export default getFormSchema;
