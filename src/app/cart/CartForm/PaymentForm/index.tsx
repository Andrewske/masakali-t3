import { type UseFormReturn } from 'react-hook-form';
import type { FormData } from '../getFormSchema';
import CreditCardForm from '../CreditCardForm';

type PaymentFormProps = {
  form: UseFormReturn<FormData>;
  setStep: (step: number) => void;
  setCanSubmit: (canSubmit: boolean) => void;
};

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const PaymentForm = ({ form, setStep }: PaymentFormProps) => {
  const { watch } = form;
  const fullName = watch('fullName');
  const email = watch('email');
  const phone = watch('phone');
  const adults = watch('adults');
  const children = watch('children');

  const address1 = watch('address.address1');
  const address2 = watch('address.address2');
  const city = watch('address.city');
  const region = watch('address.region');
  const country = watch('address.country');
  const zip_code = watch('address.zip_code');

  // const handleClick = () => {
  //   console.log('clicked');
  //   if (window.Xendit) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     console.log(window?.Xendit?.card.validateCardNumber('400')); // true
  //   }
  // };
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex justify-between items-center text-sm hover:border border-1 border-purple rounded p-2"
        onClick={() => setStep(1)}
      >
        <span>
          <p className="font-montserrat uppercase">Guest Details</p>
          <p>Name: {fullName}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Adults: {adults}</p>
          <p>Children: {children}</p>
        </span>
        <span className="grid justify-center text-sm">
          <PencilIcon />
        </span>
      </div>
      <div
        className="flex justify-between items-center text-sm p-2"
        onClick={() => setStep(2)}
      >
        <span>
          <p className="font-montserrat uppercase">Address</p>
          <p>{address1}</p>
          <p>{address2}</p>
          <p>{city}</p>
          <p>{region}</p>
          <p>{country}</p>
          <p>{zip_code}</p>
        </span>
        <span className="grid justify-center text-sm">
          <PencilIcon />
        </span>
      </div>

      <CreditCardForm form={form} />

      {/* <Stripe setCanSubmit={setCanSubmit} /> */}
    </div>
  );
};

export default PaymentForm;
