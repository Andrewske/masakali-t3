// instrumentation.ts
import type { PostHog } from 'posthog-node';

interface PostHogData {
  distinct_id: string;
}

interface RequestContext {
  headers: {
    cookie?: string;
  };
}

export function register(): void {
  // No-op for initialization
}

export const onRequestError = async (
  err: Error,
  request: RequestContext,
  context: unknown
) => {
  // Using dynamic import instead of require
  const PostHogClient = await import('./app/posthog');
  const posthog: PostHog = PostHogClient.default();

  let distinctId: string | null = null;
  if (request.headers.cookie) {
    const cookieString: string = request.headers.cookie;
    const postHogCookieMatch: RegExpMatchArray | null = cookieString.match(
      /ph_phc_.*?_posthog=([^;]+)/
    );

    if (postHogCookieMatch?.[1]) {
      try {
        const decodedCookie: string = decodeURIComponent(postHogCookieMatch[1]);
        const postHogData = JSON.parse(decodedCookie) as PostHogData;
        distinctId = postHogData.distinct_id;
      } catch (e) {
        console.error('Error parsing PostHog cookie:', e);
      }
    }
  }

  posthog.captureException(err, distinctId || undefined, { context });
};
