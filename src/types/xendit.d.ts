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
  currency: string;
};

// Type for the context of an individual error, detailing the value and field causing the issue
export type ErrorContext = {
  value: number; // The invalid value that was submitted
  key: string; // The key (field) where the error occurred
  label: string; // A label for the field, usually the same as the key
};

// Type for each individual error in the errors array
export type DetailedError = {
  message: string; // Descriptive message about what is wrong
  path: string[]; // Path to the field in the data object that caused the error
  type: string; // Type of validation error, e.g., 'number.integer'
  context: ErrorContext; // Additional context about the error
};

// Type for the overall error response from the server
export type XenditErrorResponse = {
  error_code: string; // Error code indicating the type of error (e.g., 'API_VALIDATION_ERROR')
  message: string; // General message about the error
  errors: DetailedError[]; // Array of detailed errors
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

type XenditChargeResponse = {
  status: string;
  authorized_amount: number;
  capture_amount: number;
  currency: string;
  metadata: Record<string, unknown>;
  credit_card_token_id: string;
  business_id: string;
  merchant_id: string;
  merchant_reference_code: string;
  external_id: string;
  eci: string;
  charge_type: string;
  masked_card_number: string;
  card_brand: string;
  card_type: string;
  xid: string;
  cavv: string;
  descriptor: string;
  authorization_id: string;
  bank_reconciliation_id: string;
  issuing_bank_name: string;
  cvn_code: string;
  approval_code: string;
  created: string;
  id: string;
  card_fingerprint: string;
};
