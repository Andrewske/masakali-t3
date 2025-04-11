import PostHogClient from '~/app/posthog';

type TryCatchOptions = {
  captureError?: boolean;
  context?: Record<string, unknown>;
};

const isXenditError = (error: unknown) => {
  // Handle Xendit errors
  if (error && typeof error === 'object') {
    const xenditError = error as {
      errorCode?: string;
      errorMessage?: string;
      status?: number;
      errors?: Array<{ field: string; message: string }>;
    };

    if (xenditError.errorCode) {
      return {
        xenditError: {
          code: xenditError.errorCode,
          message: xenditError.errorMessage,
          status: xenditError.status,
          errors: xenditError.errors,
        },
      };
    }
  }

  return {};
};

export const tryCatch = async <T>(
  promise: Promise<T>,
  options: TryCatchOptions = { captureError: true }
): Promise<{ data: T | null; error: Error | null }> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    const xenditOptions = isXenditError(error);

    // Handle other errors
    if (error instanceof Error) {
      if (options.captureError) {
        const posthog = await PostHogClient();
        posthog.captureException(error, undefined, {
          message: error.message,
          stack: error.stack,
          ...options.context,
          ...xenditOptions,
        });
        await posthog.shutdown();
      }
      return { data: null, error };
    }

    return { data: null, error: new Error('Unknown error occurred') };
  }
};

// Example usage:
/*
const { data, error } = await tryCatch(
  async () => {
    // Your async function here
    return await someAsyncOperation();
  },
  {
    captureError: true,
    context: {
      operation: 'user_registration',
      userId: '123',
    },
  }
);
*/
