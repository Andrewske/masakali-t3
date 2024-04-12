//https://docs.xendit.co/credit-cards/integrations/tokenization

import type {
  TokenDataType,
  XenditErrorResponse,
  XenditResponseType,
} from '~/types/xendit';
import { env } from '~/env.mjs';
import { useXenditStore } from '~/stores/xenditStore';

type XenditCreateTokenProps = {
  amount: number;
  card_number: string;
  card_exp_month: string;
  card_exp_year: string;
  card_cvn: string;
  is_multiple_use: boolean;
};

export const xenditCreateToken = async (data: XenditCreateTokenProps) => {
  console.log('Creating token with data:', data);
  if (!window.Xendit) {
    console.log('Xendit not loaded');
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  window.Xendit.setPublishableKey(env.NEXT_PUBLIC_XENDIT_PUBLIC_TEST_KEY);

  console.log(data.amount);

  const tokenData: TokenDataType = {
    ...data,
    amount: Math.round(data.amount),
    currency: 'IDR',
    should_authenticate: true,
  };

  // const response = window.Xendit.card.validateCardNumber(tokenData.card_number);
  // console.log('Card number validation:', response);

  await window.Xendit.card.createToken(tokenData, xenditResponseHandler);

  return false;
};

export const xenditResponseHandler = (
  /* The `err: XenditErrorResponse` in the `xenditResponseHandler` function signature is defining a
parameter named `err` with the type `XenditErrorResponse`. This parameter is used to capture any
error response that may be returned by the Xendit API when handling the token creation process. It
allows the function to handle and process any errors that occur during the tokenization process. */
  err: XenditErrorResponse,
  response: XenditResponseType
) => {
  const { setPayerAuthUrl, setShowModal, setError, setToken } =
    useXenditStore.getState();

  console.log('Xendit response:', response);
  // console.log('Xendit error:', err);

  // if (err || !response) {
  //   console.error('Error creating token:', err);
  //   setError(err?.message || 'Unknown error during tokenization');
  //   return;
  // }

  console.log('Xendit response:', response);

  if (response) {
    switch (response.status) {
      case 'IN_REVIEW':
        if (response.payer_authentication_url) {
          setPayerAuthUrl(response.payer_authentication_url);
          setShowModal(true); // Open the modal for 3D Secure
        }
        break;
      case 'VERIFIED':
        console.log('Token created:', response.id);
        setToken(response.id); // Save the token for further processing
        setShowModal(false); // Close any open modal
        break;
      case 'FAILED':
        console.error(
          'Token failed:',
          response.failure_reason || 'Unknown error'
        );
        setError(response.failure_reason || 'Failed without a specific reason');
        break;
      default:
        console.error('Unhandled response status:', response.status);
        setError('Unhandled response status');
    }
  }
};
