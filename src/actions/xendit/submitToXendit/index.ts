import type { FormData } from '~/app/cart/CartForm/getFormSchema';
import { xenditCreateToken } from '~/utils/xendit';

type SubmitToXenditProps = {
  formData: FormData;
  totalIDR: number;
};
export const submitToXendit = async ({
  formData,
  totalIDR,
}: SubmitToXenditProps) => {
  const [cardExpMonth, cardExpYear] = formData.cc_expiry.split('/');

  if (!cardExpMonth || !cardExpYear) {
    console.error('Error with splitting card expiration');
    return;
  }

  return await xenditCreateToken({
    amount: totalIDR,
    card_number: formData.cc_number.replace(/\s/g, ''),
    card_exp_month: cardExpMonth.replace(/\s/g, ''),
    card_exp_year: '20' + cardExpYear.replace(/\s/g, ''),
    card_cvn: formData.cc_cvc.replace(/\s/g, ''),
    is_multiple_use: false,
  });
};
