import { z } from 'zod';
import { type VillaNamesType } from '~/utils/smoobu';
import { villaGuestLimits } from '~/lib/villas';

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
  | 'address.zip_code';

const getFormSchema = (villaName: VillaNamesType) => {
  return formSchema.refine(
    (data) => {
      // Look up the limits for the selected villa
      const limits = villaGuestLimits[villaName];
      // Validate the total number of guests, adults, and children against the limits
      return (
        data.adults + data.children <= limits.maxGuests &&
        data.adults <= limits.maxAdults &&
        data.children <= limits.maxChildren
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
