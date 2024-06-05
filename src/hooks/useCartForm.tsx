'use client';
import type { Dispatch, SetStateAction } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useUserStore } from '~/providers/UserStoreProvider';
import { submitToXendit } from '~/actions/xendit/submitToXendit';
import { zodResolver } from '@hookform/resolvers/zod';
import getFormSchema, {
  type FormData,
} from '~/app/cart/CartForm/getFormSchema';
import { type VillaNamesType } from '~/lib/villas';

// const formDefaultValues = {
//   fullName: 'Kevin Andrews',
//   email: 'andrewskevin92@gmail.com',
//   phone: '08123456789',
//   adults: 2,
//   children: 0,
//   address: {
//     address1: 'Jl. Kebon Sirih',
//     address2: '',
//     city: 'Jakarta',
//     region: 'DKI Jakarta',
//     country: 'ID',
//     zip_code: '12345',
//   },
//   cc_number: '4000000000001091',
//   cc_expiry: '05/26',
//   cc_cvc: '999',
// };

const formDefaultValues = {
  fullName: 'Kevin Andrews',
  email: 'andrewskevin92@gmail.com',
  phone: '15098992771',
  adults: 2,
  children: 0,
  address: {
    address1: 'Jl. Kebon Sirih',
    address2: '',
    city: 'Jakarta',
    region: 'DKI Jakarta',
    country: 'ID',
    zip_code: '98208',
  },
  cc_number: '',
  cc_expiry: '',
  cc_cvc: '',
};

// const formDefaultValues = {
//   fullName: '',
//   email: '',
//   phone: '',
//   adults: 2,
//   children: 0,
//   address: {
//     address1: '',
//     address2: '',
//     city: '',
//     region: '',
//     country: '',
//     zip_code: '',
//   },
//   cc_number: '',
//   cc_expiry: '',
//   cc_cvc: '',
// };

type UseCartFormProps = {
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  villaName: VillaNamesType;
  totalIDR: number;
};

export const useCartForm = ({
  setIsProcessing,
  villaName,
  totalIDR,
}: UseCartFormProps) => {
  const { setUser } = useUserStore((state) => state);

  const formOptions = {
    resolver: zodResolver(getFormSchema(villaName)),
    defaultValues: formDefaultValues,
    mode: 'onSubmit' as const,
  };

  const form = useForm<FormData>(formOptions);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsProcessing(true);
    try {
      // Set the user with the form data
      const user = formatUserState({ formData });
      setUser(user);

      // Submit the form to Xendit and Create a token
      await submitToXendit({ formData, totalIDR });
      console.log('Successfully submitted form to Xendit');
    } catch (error) {
      console.log('Error submitting form to Xendit:', error);
      throw new Error('Error submitting form to Xendit');
    } finally {
      setIsProcessing(false);
    }
  };

  return { form, onSubmit };
};

const formatUserState = ({ formData }: { formData: FormData }) => {
  const { fullName, email, phone, adults, children, address } = formData;
  const { address1, address2, city, region, country, zip_code } = address;

  // Create a new user object that matches the structure expected by UserState
  const newUser = {
    fullName,
    email,
    phone,
    adults,
    children,
    address: {
      address1,
      address2,
      city,
      region,
      country,
      zip_code,
    },
  };

  // Update the user property within the UserState object
  return newUser;
};
