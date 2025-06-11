import { headers } from 'next/headers';
import PostHogClient from '~/app/posthog';
import { logError, type LogErrorParams } from './logError';
import { parseXenditError } from './xendit/parseXenditError';

interface PostHogCookie {
  distinct_id: string;
}

const extractDistinctId = (cookieString: string) => {
  if (cookieString) {
    const postHogCookieMatch: RegExpMatchArray | null = cookieString.match(
      /ph_phc_.*?_posthog=([^;]+)/
    );

    if (postHogCookieMatch?.[1]) {
      try {
        const decodedCookie: string = decodeURIComponent(postHogCookieMatch[1]);
        const { distinct_id } = JSON.parse(decodedCookie) as PostHogCookie;

        return distinct_id;
      } catch (e) {
        console.error('Error parsing PostHog cookie:', e);
      }
    }
  }
  return undefined;
};

export async function posthogCaptureMessage({
  message,
  context,
}: {
  message: string;
  context: Record<string, unknown>;
}): Promise<void> {
  try {
    const posthog = PostHogClient();

    posthog.capture({
      distinctId: '111111',
      event: message,
      properties: context,
    });

    await posthog.shutdown();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in posthogCaptureMessage: ${error.message}`);
    } else {
      console.error('Error in posthogCaptureMessage', error);
    }
  }
}

export async function posthogServerError({
  error,
  context,
}: {
  error: Error | null;
  context: Record<string, unknown>;
}): Promise<void> {
  if (!error) return;
  try {
    const { xenditError } = parseXenditError(error);
    const posthog = PostHogClient();

    const cookieString: string = (await headers()).get('cookie') ?? '';

    const distinctId = extractDistinctId(cookieString);

    posthog.captureException(error, distinctId, {
      ...context,
      ...xenditError,
    });
    await posthog.shutdown();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in posthogServerError: ${error.message}`);
    } else {
      console.error('Error in posthogServerError', error);
    }
  }
}

export async function logAndPosthog({
  message,
  error = null,
  level = 'error',
  data = {},
}: LogErrorParams) {
  logError({ message, error, level, data });
  await posthogServerError({
    error: new Error(message),
    context: { message, level, data },
  });
  // throw new Error(message);
}
