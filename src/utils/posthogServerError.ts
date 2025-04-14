import PostHogClient from '~/app/posthog';

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

export default async function posthogServerError({
  error,
  context,
}: {
  error: Error | null;
  context: Record<string, unknown>;
}): Promise<void> {
  if (!error) return;
  const { xenditError } = isXenditError(error);
  const posthog = PostHogClient();

  posthog.captureException(error, undefined, {
    ...context,
    ...xenditError,
  });
  await posthog.shutdown();
}
