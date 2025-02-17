'use client';
import { useEffect, useMemo, useState } from 'react';
import { BeatLoader } from 'react-spinners';
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
  reservationId,
}: {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
  reservationId: string;
}) {
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

  const villaName = getVillaName(villaId);

  // if (!checkin || !checkout) {
  //   throw new Error('Date range is not set');
  // }

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
      <div className="relative w-full h-[600px] flex flex-col">
        <div className="p-4 w-full text-center bg-purple text-white">
          <h2>Checkout</h2>
        </div>
        <Form {...form}>
          <form className="flex w-full  p-4 bg-gray flex-col justify-center gap-2 grow ">
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
            <p>Admin Discount Applied total = {pricing.finalPrice}</p>
          )}
        </Form>
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Spinner */}
            <BeatLoader
              color="#fff"
              size={15}
            />
          </div>
        )}
      </div>
    </>
  );
}
