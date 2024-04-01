'use client';
import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import type { StripeError } from '@stripe/stripe-js';
// import { stripeCheckout } from '~/actions/stripe';

// import { createReservation } from '~/actions/smoobu';
import AddressForm from './AddressForm';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';
import getFormSchema, { type FormData } from './getFormSchema';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { type VillaPricingType, createPricingObject } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { useUserStore } from '~/providers/UserStoreProvider';
// import { useToast } from '~/components/ui/use-toast';
import { type UserState } from '~/stores/userStore';
import {
  sendBookingConfirmation,
  // type EmailTemplateData,
} from '~/actions/sendgrid';
import { formatCurrency } from '~/utils/helpers';
import { xenditCreateToken } from '~/utils/xendit';

export default function CartForm({
  villaId,
  villaPricing,
}: {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const { conversionRates, setConversionRates, currency } = useCurrencyStore(
    (state) => state
  );
  const { dateRange } = useReservationStore((state) => state);
  const { user, setUser, _hasHydrated } = useUserStore((state) => state);
  const [step, setStep] = useState(1);
  const stripe = useStripe();
  const elements = useElements();
  // const { toast } = useToast();
  const checkin = dateRange.from;
  const checkout = dateRange.to;
  const villaName = getVillaName(villaId);

  useEffect(() => {
    console.log(user, _hasHydrated);
  }, [user, _hasHydrated]);

  useEffect(() => {
    setConversionRates();
  }, [setConversionRates]);
  if (!checkin || !checkout) {
    throw new Error('Date range is not set');
  }

  const conversionRateToUSD = conversionRates['USD'];

  const { finalPrice, discount, taxes, numNights, pricePerNight, totalIDR } =
    createPricingObject({
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
    defaultValues: {
      fullName: 'Kevin Andrews',
      email: 'andrewskevin92@gmail.com',
      phone: '08123456789',
      adults: 2,
      children: 0,
      address: {
        address1: 'Jl. Kebon Sirih',
        address2: '',
        city: 'Jakarta',
        region: 'DKI Jakarta',
        country: 'Indonesia',
        zip_code: '12345',
      },
      cc_number: '4000000000001091',
      cc_expiry: '05/26',
      cc_cvc: '999',
    },
    mode: 'onSubmit' as const,
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

    const [cardExpMonth, cardExpYear] = formData.cc_expiry.split('/');

    if (!cardExpMonth || !cardExpYear) {
      setIsProcessing(false);
      return;
    }

    xenditCreateToken({
      amount: totalIDR,
      card_number: formData.cc_number,
      card_exp_month: cardExpMonth,
      card_exp_year: '20' + cardExpYear,
      card_cvn: formData.cc_cvc,
      is_multiple_use: false,
    });

    console.log('submitting form data', formData);

    // const cardElement = elements?.getElement(CardElement);

    // const billingDetails = {
    //   name: formData.fullName,
    //   email,
    //   phone,
    //   address: {
    //     city,
    //     country,
    //     line1: formData.address.address1,
    //     line2: formData.address.address2 ?? '',
    //     postal_code: formData.address.zip_code,
    //     state: formData.address.region,
    //   },
    // };

    // if (stripe && cardElement && billingDetails) {
    //   console.log('card element', cardElement);
    //   console.log('submitting form data', formData);
    // }
    // const user: UserState['user'] = {
    //   fullName: formData.fullName,
    //   email: formData.email,
    //   phone: formData.phone,
    //   adults: formData.adults,
    //   children: formData.children,
    //   address: {
    //     address1: formData.address.address1,
    //     address2: formData.address.address2,
    //     city: formData.address.city,
    //     region: formData.address.region,
    //     country: formData.address.country,
    //     zip_code: formData.address.zip_code,
    //   },
    // };

    // setUser(user);

    // await sendBookingConfirmation({
    //   data: {
    //     name: formData.fullName,
    //     email: formData.email,
    //     country: formData.address.country,
    //     villaName,
    //     startDate: checkin.toISOString(),
    //     endDate: checkout.toISOString(),
    //     numDays: numNights,
    //     price: formatCurrency(pricePerNight, currency),
    //     discount: formatCurrency(discount, currency),
    //     taxes: formatCurrency(taxes, currency),
    //     total: formatCurrency(finalPrice, currency),
    //   },
    //   isRetreat: false,
    // });

    setIsProcessing(false);

    return null;

    // await createReservation({
    //   villaId,
    //   checkin,
    //   checkout,
    //   finalPrice: totalIDR,
    //   firstName: formData.fullName.split(' ')[0] ?? '',
    //   lastName: formData.fullName.split(' ')[1] ?? '',
    //   email: formData.email,
    //   phone: formData.phone,
    //   adults: formData.adults,
    //   children: formData.children,
    //   country: formData.address.country,
    //   stripePaymentIntentId: '',
    // });

    // setIsProcessing(false);

    // try {
    //   const price = finalPrice / conversionRate;

    //   if (price && stripe && cardElement && billingDetails) {
    //     console.log('here', price, stripe, cardElement, billingDetails);
    //     const { clientSecret } = await stripeCheckout({
    //       price: price,
    //       stripe,
    //       cardElement,
    //       billingDetails,
    //     });

    //     if (!clientSecret) {
    //       throw new Error('Client Secret not found');
    //     }

    //     stripe
    //       .retrievePaymentIntent(clientSecret)
    //       .then(({ paymentIntent }) => {
    //         if (!paymentIntent) {
    //           throw new Error('Payment Intent not found');
    //         }
    //         switch (paymentIntent?.status) {
    //           case 'succeeded':
    //             // send reservation to smoobu

    //             // send email to user
    //             toast({ title: 'Payment succeeded' });
    //             break;
    //           case 'processing':
    //             toast({ title: 'Payment processing' });
    //             break;
    //           case 'requires_payment_method':
    //             toast({ title: 'Payment failed' });
    //             break;
    //           default:
    //             toast({ title: 'Something went wrong' });
    //             break;
    //         }
    //       })
    //       .catch((error: StripeError) => {
    //         toast({ title: error.message });
    //       });
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  const errors = form.formState.errors;

  function isButtonDisabled() {
    if (step === 1) {
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
            setCanSubmit={setCanSubmit}
          />
        )}

        {step === 3 ? (
          <Button
            type="submit"
            className="bg-purple my-4 w-full"
            disabled={!canSubmit || isProcessing || !stripe}
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
