export const parseXenditError = (error: unknown) => {
  // Handle Xendit errors
  if (error && typeof error === 'object') {
    const xenditError = error as {
      errorCode?: string;
      errorMessage?: string;
      status?: number;
      response?: {
        errors?: Array<{ field: string[]; messages: string[] }>;
      };
      rawResponse?: {
        errors?: Array<{ field: string[]; messages: string[] }>;
      };
    };

    if (xenditError.errorCode) {
      return {
        xenditError: {
          code: xenditError.errorCode,
          message: xenditError.errorMessage,
          status: xenditError.status,
          errors:
            xenditError.response?.errors ?? xenditError.rawResponse?.errors,
        },
      };
    }
  }

  return {};
};
