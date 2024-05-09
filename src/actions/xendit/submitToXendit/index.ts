'use client';

import type { FormData } from '~/app/cart/CartForm/getFormSchema';
import { xenditCreateToken } from '~/utils/xendit';

type SubmitToXenditProps = {
  formData: FormData;
  // setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  totalIDR: number;
};
export const submitToXendit = async ({
  formData,
  // setIsProcessing,
  totalIDR,
}: SubmitToXenditProps) => {
  const [cardExpMonth, cardExpYear] = formData.cc_expiry.split('/');
  console.log({ cardExpMonth, cardExpYear });

  if (!cardExpMonth || !cardExpYear) {
    console.error('Error with splitting card expiration');
    return;
  }

  console.log('formData', formData);

  await xenditCreateToken({
    amount: totalIDR,
    card_number: formData.cc_number,
    card_exp_month: cardExpMonth,
    card_exp_year: '20' + cardExpYear,
    card_cvn: formData.cc_cvc,
    is_multiple_use: false,
  });
};
