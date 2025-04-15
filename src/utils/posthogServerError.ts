import PostHogClient from '~/app/posthog';
import { parseXenditError } from './xendit/parseXenditError';
import { headers } from 'next/headers';
import { logError, type LogErrorParams } from './logError';

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
    console.error(error);
  }
}

export async function logAndPosthog({
  message,
  error = null,
  level = 'error',
  data = {},
}: LogErrorParams) {
  if (error instanceof Error) {
    logError({ message, error, level, data });
    await posthogServerError({
      error: new Error(message),
      context: { message, level, data },
    });
  }
  throw new Error(message);
}
