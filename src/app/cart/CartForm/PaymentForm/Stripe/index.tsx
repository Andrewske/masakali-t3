import { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import StripeError from './StripeError';

const Stripe = () => {
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cardElementOptions = {
    hidePostalCode: true,
  };

  const handleCardDetailsChange = (e: StripeCardElementChangeEvent) => {
    e.error ? setCheckoutError(e?.error?.message) : setCheckoutError(null);
  };
  return (
    <div>
      <CardElement
        options={cardElementOptions}
        onChange={handleCardDetailsChange}
      />
      <span style={{ fontSize: '.5rem', margin: '0 auto' }}>
        Powered by Stripe
      </span>
      {checkoutError && <StripeError>{checkoutError}</StripeError>}
    </div>
  );
};

export default Stripe;
