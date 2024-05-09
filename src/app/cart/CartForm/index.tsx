'use client';
import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';

import { Form } from '~/components/ui/form';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { type VillaPricingType } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { useUserStore } from '~/providers/UserStoreProvider';
import useFetchPaymentData from '~/hooks/useFetchPaymentData';

import CartSubmitButton from './CartSubmitButton';
import { useCartForm } from '~/hooks/useCartForm';
import { useVillaPricing } from '~/hooks/useVillaPricing';
import { useFormSteps } from '~/hooks/useFormSteps';

export default function CartForm({
  villaId,
  villaPricing,
}: {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currency, setConversionRates } = useCurrencyStore((state) => state);
  const { dateRange } = useReservationStore((state) => state);
  const { user } = useUserStore((state) => state);
  const { step, nextStep, setStep } = useFormSteps(1);
  const checkin = dateRange.from;
  const checkout = dateRange.to;
  const villaName = getVillaName(villaId);
  const [adminDiscount, setAdminDiscount] = useState(false);

  if (!checkin || !checkout) {
    throw new Error('Date range is not set');
  }

  const pricing = useVillaPricing({
    villaPricing,
    checkin,
    checkout,
    adminDiscount,
  });

  useFetchPaymentData({
    user,
    villaId,
    villaName,
    checkin,
    checkout,
    ...pricing,
    currency,
  });

  const { form, onSubmit } = useCartForm({
    setIsProcessing,
    villaName,
    totalIDR: pricing.totalIDR,
  });

  useEffect(() => {
    setConversionRates();
  }, [setConversionRates]);

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
              setAdminDiscount={setAdminDiscount}
            />
          )}

          <CartSubmitButton
            form={form}
            step={step}
            nextStep={nextStep}
            isProcessing={isProcessing}
            onSubmit={onSubmit}
          />
        </form>
        {adminDiscount && (
          <p>Admin Discount Applied total = {pricing.totalIDR}</p>
        )}
      </Form>
    </>
  );
}
