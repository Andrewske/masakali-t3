import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from './images';
import type { FieldName, FormData } from '../getFormSchema';
import type { UseFormReturn } from 'react-hook-form';

type CCFormProps = {
  form: UseFormReturn<FormData>;
};

export default function CreditCardForm({ form }: CCFormProps) {
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

  return (
    <PaymentInputsWrapper {...wrapperProps}>
      <div className="flex w-full justify-between">
        <span className="grid place-items-center grid-cols-6">
          <svg {...getCardImageProps({ images })} />
          <input
            className="col-span-5"
            maxLength={19}
            value={cc_number}
            {...getCardNumberProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setValue('cc_number', e.target.value),
            })}
          />
        </span>
        <input
          className="min-w-20"
          value={cc_expiry}
          {...getExpiryDateProps({
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue('cc_expiry', e.target.value),
          })}
        />
        <input
          className=""
          value={cc_cvc}
          {...getCVCProps({
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue('cc_cvc', e.target.value),
          })}
        />
      </div>
    </PaymentInputsWrapper>
  );
}
