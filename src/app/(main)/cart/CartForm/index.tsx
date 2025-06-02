'use client';
import { useEffect, useMemo, useState } from 'react';
import AddressForm from './AddressForm';

import { Form } from '~/components/ui/form';
import useFetchPaymentData from '~/hooks/useFetchPaymentData';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { useUserStore } from '~/providers/UserStoreProvider';
import { type VillaPricingType } from '~/utils/pricing';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';

import { useCartForm } from '~/hooks/useCartForm';
import { useFormSteps } from '~/hooks/useFormSteps';
import { useVillaPricing } from '~/hooks/useVillaPricing';
import CartSubmitButton from './CartSubmitButton';

export default function CartForm({
  reservation: {
    id: reservationId,
    villa_id,
    villa: { pricing: villaPricing },
  },
}: {
  reservation: {
    id: string;
    villa_id: number;
    villa: { pricing: VillaPricingType[] };
    arrival: string;
    departure: string;
  };
}) {
  const villaId = villa_id as VillaIdsType;
  const villaName = getVillaName(villaId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [adminDiscount, setAdminDiscount] = useState(false);
  const [checkin, setCheckin] = useState<Date>(new Date());
  const [checkout, setCheckout] = useState<Date>(new Date());

  const { currency } = useCurrencyStore((state) => state);
  const { dateRange } = useReservationStore((state) => state);
  const { user } = useUserStore((state) => state);

  const { step, nextStep, setStep } = useFormSteps(1);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setCheckin(dateRange.from);
      setCheckout(dateRange.to);
    }
  }, [dateRange]);

  const pricing = useVillaPricing({
    villaPricing,
    checkin,
    checkout,
    adminDiscount,
  });

  const computePaymentData = useMemo(() => {
    return {
      user,
      villaId,
      villaName,
      checkin,
      checkout,
      ...pricing,
      currency,
    };
  }, [user, villaId, villaName, checkin, checkout, pricing, currency]);

  useFetchPaymentData({
    paymentData: computePaymentData,
    setIsProcessing,
    reservationId,
  });

  const { form, onSubmit } = useCartForm({
    setIsProcessing,
    villaName,
    totalIDR: pricing.totalIDR,
  });

  return (
    <>
      <div className="relative w-full h-[600px] flex flex-col justify-between bg-gray ">
        <div className="p-4 w-full text-center bg-purple text-white">
          <h2>Checkout</h2>
        </div>
        <Form {...form}>
          <form className="flex w-full  p-4 flex-col justify-center gap-2 grow">
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
          </form>
          {adminDiscount && (
            <p>Admin Discount Applied total = {pricing.finalPrice}</p>
          )}
        </Form>
        <div className="p-4 w-full text-center">
          {isProcessing ? (
            <span>Processing...</span>
          ) : (
            <CartSubmitButton
              form={form}
              step={step}
              nextStep={nextStep}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
}
