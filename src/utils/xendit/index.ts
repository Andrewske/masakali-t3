//https://docs.xendit.co/credit-cards/integrations/tokenization

import type { TokenDataType, XenditResponseType } from '~/types/xendit';

type XenditCreateTokenProps = {
  amount: number;
  card_number: string;
  card_exp_month: string;
  card_exp_year: string;
  card_cvn: string;
  is_multiple_use: boolean;
};

export const xenditCreateToken = (data: XenditCreateTokenProps) => {
  console.log('Creating token with data:', data);
  if (!window.Xendit) {
    console.log('Xendit not loaded');
    return;
  }

  const tokenData: TokenDataType = {
    ...data,
    should_authenticate: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  window.Xendit.card.createToken(tokenData, xenditResponseHandler);

  return false;
};

export const xenditResponseHandler = (response: XenditResponseType) => {
  if ('status' in response) {
    if (response.status === 'IN_REVIEW') {
      window.open(response.payer_authentication_url);
    }
    if (response.status === 'VERIFIED') {
      const token = response.id;

      console.log('Token created:', token);
    }
    if (response.status === 'FAILED' && 'failure_reason' in response) {
      console.log(
        'Token failed with status: ' +
          (response?.failure_reason ?? 'Unknown error')
      );
    } else if ('error_code' in response && 'message' in response) {
      console.log(response);
      console.log(response.error_code);
      console.log(
        `Token failed with status: ${
          (response.message as string) ?? 'Unknown error'
        }`
      );
    }
  }
};
