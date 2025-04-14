import { PostHog } from 'posthog-node';
import PostHogClient from '~/app/posthog';
import { env } from '~/env.mjs';

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
  try {
    const { xenditError } = isXenditError(error);
    const posthog = PostHogClient();

    posthog.captureException(error, undefined, {
      ...context,
      ...xenditError,
    });
    await posthog.shutdown();

    const client = new PostHog(
      env.NEXT_PUBLIC_POSTHOG_KEY,
      { host: 'https://webhook.site/7fc15cc4-a785-41de-b3a4-3dc2bbd46096' } // Replace with the URL you copied from webhook.site
    );

    client.captureException(error);
    await client.shutdown();
  } catch (error) {
    console.error(error);
  }
}
