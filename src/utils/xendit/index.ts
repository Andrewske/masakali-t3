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

export const xenditCreaetToken = (data: XenditCreateTokenProps) => {
  if (!window.Xendit) {
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
  if (response.status === 'IN_REVIEW') {
    window.open(response.payer_authentication_url);
  } else {
    console.log('Token failed with status: ' + response.status);
  }
};
