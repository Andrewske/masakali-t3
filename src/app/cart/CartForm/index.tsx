'use client';
import { useQuery } from '@tanstack/react-query';
import { getPricing } from '~/actions/smoobu';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressForm from './AddressForm';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { stripeCheckout } from '~/actions/stripe';

import {
  getVillaName,
  type VillaNamesType,
  type villaIdsType,
} from '~/utils/smoobu';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';

import getFormSchema, { type FormData } from './getFormSchema';
import { env } from 'process';
import { StripeError } from '@stripe/stripe-js';

export default function CartForm({
  villaId,
  checkIn,
  checkOut,
}: {
  villaId: villaIdsType;
  checkIn: string;
  checkOut: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const villaName = getVillaName(villaId);
  const [step, setStep] = useState(1);
  const stripe = useStripe();
  // Import the necessary dependency

  const elements = useElements();

  const { data: pricingData, error } = useQuery({
    // Provide proper typings for the variables
    queryFn: () => getPricing({ checkIn, checkOut, villaId }),
    queryKey: ['cart', checkIn, checkOut, villaId],
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const formOptions = {
    resolver: zodResolver(getFormSchema(villaName)),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      adults: 2,
      children: 0,
      address: {
        address1: '',
        address2: '',
        city: '',
        region: '',
        country: '',
        zip_code: '',
      },
    },
    mode: 'onChange' as const,
  };

  const form = useForm<FormData>(formOptions);

  const fullName = form.watch('fullName');
  const email = form.watch('email');
  const phone = form.watch('phone');
  const adults = form.watch('adults');
  const children = form.watch('children');
  const address = form.watch('address');
  const address1 = form.watch('address.address1');
  const city = form.watch('address.city');
  const region = form.watch('address.region');
  const country = form.watch('address.country');
  const zip_code = form.watch('address.zip_code');

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsProcessing(true);
    const cardElement = elements?.getElement(CardElement);

    const billingDetails = {
      name: formData.fullName,
      email,
      phone,
      address: {
        city,
        country,
        line1: formData.address.address1,
        line2: formData.address.address2 ?? '',
        postal_code: formData.address.zip_code,
        state: formData.address.region,
      },
    };

    try {
      if (
        process.env.NODE_ENV === 'development' &&
        pricingData?.pricing?.total &&
        stripe &&
        cardElement &&
        billingDetails
      ) {
        console.log(
          'here',
          pricingData?.pricing?.total,
          stripe,
          cardElement,
          billingDetails
        );
        const { paymentIntent, errors } = await stripeCheckout({
          price: pricingData?.pricing?.total,
          stripe,
          cardElement,
          billingDetails,
        });

        console.log(paymentIntent);

        if (errors) {
          (errors as StripeError[]).forEach((error: StripeError) => {
            console.error(error);
          });
          throw new Error('Error processing payment');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  const errors = form.formState.errors;

  function isButtonDisabled() {
    if (step === 4) {
      return (
        !fullName ||
        !!errors.fullName ||
        !email ||
        !!errors.email ||
        !phone ||
        !!errors.phone
      );
    } else if (step === 2) {
      return (
        !address1 ||
        !!errors?.address?.address1 ||
        !city ||
        !!errors?.address?.city ||
        !region ||
        !!errors?.address?.region ||
        !country ||
        !!errors?.address?.country ||
        !zip_code ||
        !!errors?.address?.zip_code
      );
    }
    return false;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 bg-gray flex-col justify-center items-center gap-2"
      >
        {step === 1 && (
          <GuestDetailsForm
            form={form}
            villaName={villaName}
          />
        )}
        {step === 2 && <AddressForm form={form} />}
        {step === 3 && (
          <PaymentForm
            form={form}
            setStep={setStep}
          />
        )}

        {step === 3 ? (
          <Button
            type="submit"
            className="bg-purple my-4 w-full"
            disabled={isProcessing || !stripe}
          >
            Submit
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-purple my-4 w-full"
            disabled={isButtonDisabled()}
          >
            Next Step
          </Button>
        )}
      </form>
    </Form>
  );
}
