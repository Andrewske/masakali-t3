import React from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import Button from '~/components/Button';

import type { FormData } from '../getFormSchema';

type CartSubmitButtonProps = {
  step: number;
  nextStep: () => void;
  form: UseFormReturn<FormData>;
  onSubmit: SubmitHandler<FormData>;
};

const CartSubmitButton = ({
  step,
  nextStep,
  form,
  onSubmit,
}: CartSubmitButtonProps) => {
  if (step === 3) {
    return (
      <Button
        callToAction="Submit"
        handleClick={form.handleSubmit(onSubmit)}
        isLoadingText="Processing..."
      />
    );
  }

  return (
    <Button
      callToAction="Next Step"
      handleClick={nextStep}
    />
  );
};

export default CartSubmitButton;
