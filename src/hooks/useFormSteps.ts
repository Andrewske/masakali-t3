import { useState } from 'react';

export const useFormSteps = (initialStep: number) => {
  const [step, setStep] = useState(initialStep);
  const nextStep = () => setStep((currentStep) => currentStep + 1);
  return { step, setStep, nextStep };
};
