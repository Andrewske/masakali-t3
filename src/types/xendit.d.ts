// global.d.ts

declare global {
  interface Window {
    Xendit: {
      card: {
        createToken: (
          tokenData: TokenDataType, // Replace 'any' with the actual type of tokenData
          callback: (response: XenditResponseType) => void // Replace 'any' with the actual type of the response
        ) => Promise<string>;
      };
    };
  }
}

export type TokenDataType = {
  amount: number;
  card_number: string;
  card_exp_month: string;
  card_exp_year: string;
  card_cvn: string;
  is_multiple_use: boolean;
  should_authenticate: boolean;
};

export type XenditResponseType = {
  id: string;
  authentication_id: string;
  external_id?: string;
  masked_card_number: string;
  status: string;
  payer_authentication_url?: string;
  failure_reason?: string;
  card_info?: {
    bank?: string;
    country?: string;
    type?: string;
    brand?: string;
  };
};
