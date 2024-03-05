'use client';
import { useQuery } from '@tanstack/react-query';
import { getPricing } from '~/actions/smoobu';
import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressForm from './AddressForm';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { stripeCheckout } from '~/actions/stripe';

import { getVillaName, type VillaIdsType } from '~/lib/villas';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';

import getFormSchema, { type FormData } from './getFormSchema';
import type { StripeError } from '@stripe/stripe-js';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { type VillaPricingType, createPricingObject } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { useUserStore } from '~/providers/UserStoreProvider';
import { useToast } from '~/components/ui/use-toast';

export default function CartForm({
  villaId,
  villaPricing,
}: {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { conversionRate, conversionRates, setConversionRates } =
    useCurrencyStore((state) => state);
  const { dateRange } = useReservationStore((state) => state);
  const { user, setUser } = useUserStore((state) => state);
  const [step, setStep] = useState(1);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const checkin = dateRange.from;
  const checkout = dateRange.to;
  const villaName = getVillaName(villaId);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    setConversionRates();
  }, []);
  if (!checkin || !checkout) {
    throw new Error('Date range is not set');
  }

  const conversionRateToUSD = conversionRates['USD'];

  const { finalPrice } = createPricingObject({
    villaPricing,
    checkin,
    checkout,
    conversionRate: conversionRateToUSD ?? 1,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const formOptions = {
    resolver: zodResolver(getFormSchema(villaName)),
    defaultValues: user,
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

  useEffect(() => {
    setUser({
      user: {
        fullName,
        email,
        phone,
        adults,
        children,
        address: {
          address1,
          address2: address?.address2,
          city,
          region,
          country,
          zip_code,
        },
      },
    });
  }, [
    fullName,
    email,
    phone,
    adults,
    children,
    address1,
    address,
    city,
    region,
    country,
    zip_code,
    setUser,
  ]);

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

    setUser({
      user: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        adults: formData.adults,
        children: formData.children,
        address: {
          address1: formData.address.address1,
          address2: formData.address.address2,
          city: formData.address.city,
          region: formData.address.region,
          country: formData.address.country,
          zip_code: formData.address.zip_code,
        },
      },
    });

    try {
      const price = finalPrice / conversionRate;

      if (price && stripe && cardElement && billingDetails) {
        console.log('here', price, stripe, cardElement, billingDetails);
        const { clientSecret } = await stripeCheckout({
          price: price,
          stripe,
          cardElement,
          billingDetails,
        });

        if (!clientSecret) {
          throw new Error('Client Secret not found');
        }

        stripe
          .retrievePaymentIntent(clientSecret)
          .then(({ paymentIntent }) => {
            if (!paymentIntent) {
              throw new Error('Payment Intent not found');
            }
            switch (paymentIntent?.status) {
              case 'succeeded':
                toast({ title: 'Payment succeeded' });
                break;
              case 'processing':
                toast({ title: 'Payment processing' });
                break;
              case 'requires_payment_method':
                toast({ title: 'Payment failed' });
                break;
              default:
                toast({ title: 'Something went wrong' });
                break;
            }
          })
          .catch((error: StripeError) => {
            toast({ title: error.message });
          });
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
