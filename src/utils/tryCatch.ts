import PostHogClient from '~/app/posthog';

type TryCatchOptions = {
  captureError?: boolean;
  context?: Record<string, unknown>;
};

// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// export const tryCatch = async <T>(
//   promise: Promise<T>,
//   options: TryCatchOptions = { captureError: true }
// ): Promise<{ data: T | null; error: Error | null }> => {
//   try {
//     const data = await promise;
//     return { data, error: null };
//   } catch (error) {
//     // const { xenditError } = isXenditError(error);

//     // Handle other errors
//     if (error instanceof Error) {
//       // // if (options.captureError) {
//       // try {
//       //   const posthog = PostHogClient();
//       //   posthog.captureException(error, undefined, {
//       //     message: error.message,
//       //     stack: error.stack,
//       //     ...options.context,
//       //     ...xenditError,
//       //   });
//       //   await posthog.shutdown();
//       // } catch (error) {
//       //   console.error('Error sending error to PostHog:', error);
//       // }
//       // // }
//       return { data: null, error };
//     }

//     return { data: null, error: new Error('Unknown error occurred') };
//   }
// };

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
