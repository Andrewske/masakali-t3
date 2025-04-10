import React from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import type { FormData } from '../getFormSchema';

type CartSubmitButtonProps = {
  step: number;
  nextStep: () => void;
  isProcessing: boolean;
  form: UseFormReturn<FormData>;
  onSubmit: SubmitHandler<FormData>;
};

const CartSubmitButton = ({
  step,
  nextStep,
  isProcessing,
  form,
  onSubmit,
}: CartSubmitButtonProps) => {
  if (step === 3) {
    return (
      <Button
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        className="bg-purple my-4 w-full"
        disabled={isProcessing}
      >
        Submit
      </Button>
    );
  }
  return (
    <Button
      type="button"
      onClick={nextStep}
      className="bg-purple my-4 w-full"
      disabled={isProcessing}
    >
      Next Step
    </Button>
  );
};

export default CartSubmitButton;
