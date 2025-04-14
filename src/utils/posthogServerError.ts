import { PostHog } from 'posthog-node';
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

  const client = new PostHog(
    '_6SG-F7I1vCuZ-HdJL3VZQqjBlaSb1_20hDPwqMNnGI',
    { host: 'https://webhook.site/7fc15cc4-a785-41de-b3a4-3dc2bbd46096' } // Replace with the URL you copied from webhook.site
  );

  client.captureException(error, undefined, {
    ...context,
    ...xenditError,
  });
  await posthog.shutdown();
}
