'use client';
import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { xenditCreateToken } from '~/utils/xendit';

import { useXenditStore } from '~/stores/xenditStore';
import { confirmXenditPayment } from '~/actions/xendit';

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
  const { token, setToken, setPaymentSuccess, paymentSuccess } =
    useXenditStore();
  const { dateRange } = useReservationStore((state) => state);
  const { user, setUser } = useUserStore((state) => state);
  const [step, setStep] = useState(1);

  // const { toast } = useToast();
  const checkin = dateRange.from;
  const checkout = dateRange.to;
  const villaName = getVillaName(villaId);

  const conversionRateToUSD = conversionRates['USD'];

  if (!checkin || !checkout) {
    throw new Error('Date range is not set');
  }

  const { finalPrice, discount, taxes, numNights, pricePerNight, totalIDR } =
    createPricingObject({
      villaPricing,
      checkin,
      checkout,
      conversionRate: conversionRateToUSD ?? 1,
    });

  useEffect(() => {
    setConversionRates();
  }, [setConversionRates]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        console.log({ token });
        console.log({ user });
        const payment = await confirmXenditPayment({
          token,
          user,
          reservation: {
            villaId,
            villaName,
            checkin,
            checkout,
            numNights,
            finalPrice,
            pricePerNight,
            discount,
            taxes,
            totalIDR,
            currency,
          },
        }).catch((err) => {
          console.error(err);
          return false;
        });
        console.log({ payment });
        setToken(null);
        setPaymentSuccess(payment);
      }
    };

    void fetchData();
  }, [
    token,
    user,
    setToken,
    setPaymentSuccess,
    totalIDR,
    villaId,
    villaName,
    checkin,
    checkout,
    numNights,
    finalPrice,
    pricePerNight,
    discount,
    taxes,
    currency,
  ]);

  useEffect(() => {
    if (paymentSuccess) {
      console.log('Payment success');
    } else {
      console.log('Payment failed');
    }
  }, [paymentSuccess]);

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
        country: 'ID',
        zip_code: '12345',
      },
      cc_number: '4000000000001091',
      cc_expiry: '05/26',
      cc_cvc: '999',
    },
    mode: 'onSubmit' as const,
  };

  const form = useForm<FormData>(formOptions);

  // const fullName = form.watch('fullName');
  // const email = form.watch('email');
  // const phone = form.watch('phone');
  // const adults = form.watch('adults');
  // const children = form.watch('children');
  // const address = form.watch('address');
  // const address1 = form.watch('address.address1');
  // const city = form.watch('address.city');
  // const region = form.watch('address.region');
  // const country = form.watch('address.country');
  // const zip_code = form.watch('address.zip_code');

  // useEffect(() => {
  //   setUser({
  //     fullName,
  //     email,
  //     phone,
  //     adults,
  //     children,
  //     address: {
  //       address1,
  //       address2: address?.address2,
  //       city,
  //       region,
  //       country,
  //       zip_code,
  //     },
  //   });
  // }, [
  //   fullName,
  //   email,
  //   phone,
  //   adults,
  //   children,
  //   address1,
  //   address,
  //   city,
  //   region,
  //   country,
  //   zip_code,
  //   setUser,
  // ]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsProcessing(true);

    const user = formatUserState({ formData });
    setUser(user);
    await submitToXendit({ formData, setIsProcessing, totalIDR });

    setIsProcessing(false);
    return false;
  };

  return (
    <>
      <Form {...form}>
        <form className="w-full p-4 bg-gray flex-col justify-center items-center gap-2">
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
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-purple my-4 w-full"
              disabled={!canSubmit || isProcessing}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-purple my-4 w-full"
              disabled={!canSubmit || isProcessing}
            >
              Next Step
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}

type SubmitToXenditProps = {
  formData: FormData;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  totalIDR: number;
};

const submitToXendit = async ({
  formData,
  setIsProcessing,
  totalIDR,
}: SubmitToXenditProps) => {
  const [cardExpMonth, cardExpYear] = formData.cc_expiry.split('/');

  if (!cardExpMonth || !cardExpYear) {
    setIsProcessing(false);
    return;
  }

  await xenditCreateToken({
    amount: totalIDR,
    card_number: formData.cc_number,
    card_exp_month: cardExpMonth,
    card_exp_year: '20' + cardExpYear,
    card_cvn: formData.cc_cvc,
    is_multiple_use: false,
  });
};

type SetUserStateProps = {
  formData: FormData;
};

const formatUserState = ({ formData }: SetUserStateProps) => {
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
