import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from './images';
import type { FieldName, FormData } from '../getFormSchema';
import type { UseFormReturn } from 'react-hook-form';
import type { SetStateAction } from 'react';

type CCFormProps = {
  form: UseFormReturn<FormData>;
  setAdminDiscount: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreditCardForm({
  form,
  setAdminDiscount,
}: CCFormProps) {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const { watch } = form;
  const setValue: (name: FieldName, value: string | undefined) => void =
    form.setValue;

  const cc_number = watch('cc_number');
  const cc_expiry = watch('cc_expiry');
  const cc_cvc = watch('cc_cvc');

  // ...

  const handleDiscount = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountCode = e.target.value;
    const response = await fetch(
      `/api/cart/discount?discountCode=${encodeURIComponent(discountCode)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log({ response });
    if (response.status === 200) {
      setAdminDiscount(true);
    }
  };

  return (
    // <PaymentInputsWrapper {...wrapperProps}>
    <div className="flex w-full gap-4 flex-wrap">
      <span className="flex justify-evenly gap-4">
        <input
          className="text-center rounded focus:outline-2"
          maxLength={19}
          onChange={handleDiscount}
        />
      </span>
      <span className="flex justify-evenly gap-4">
        <svg {...getCardImageProps({ images })} />
        <input
          className="text-center rounded focus:outline-2"
          maxLength={19}
          value={cc_number}
          {...getCardNumberProps({
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue('cc_number', e.target.value),
          })}
        />
      </span>
      <span className="flex justify-center gap-4">
        <p>Exp</p>
        <input
          className="w-16 text-center rounded"
          value={cc_expiry}
          {...getExpiryDateProps({
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue('cc_expiry', e.target.value),
          })}
        />
      </span>
      <span className="flex justify-center gap-4">
        <p>CCV</p>
        <input
          className="w-14 text-center rounded"
          value={cc_cvc}
          {...getCVCProps({
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue('cc_cvc', e.target.value),
          })}
        />
      </span>
    </div>
    // </PaymentInputsWrapper>
  );
}
