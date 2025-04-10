import PostHogClient from '~/app/posthog';

type TryCatchOptions = {
  captureError?: boolean;
  context?: Record<string, unknown>;
};

export async function tryCatch<T>(
  fn: () => Promise<T>,
  options: TryCatchOptions = { captureError: true }
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    if (options.captureError) {
      const posthog = PostHogClient();
      posthog.capture({
        distinctId: 'server',
        event: 'error',
        properties: {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          ...options.context,
        },
      });
      await posthog.shutdown();
    }
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

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
