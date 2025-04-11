import PostHogClient from './app/posthog';

// instrumentation.js
export function register() {
  // No-op for initialization
}

export const onRequestError = (
  err: Error,
  request: Request,
  context: Record<string, string>
) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const posthog = PostHogClient();

    let distinctId = null;
    if (request.headers.get('cookie')) {
      const cookieString = request.headers.get('cookie');
      const postHogCookieMatch = cookieString?.match(
        /ph_phc_.*?_posthog=([^;]+)/
      );

      if (postHogCookieMatch && postHogCookieMatch[1]) {
        try {
          const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
          const postHogData = JSON.parse(decodedCookie) as {
            distinct_id: string;
          };
          distinctId = postHogData.distinct_id;
        } catch (e) {
          console.error('Error parsing PostHog cookie:', e);
        }
      }
    }

    posthog.captureException(err, distinctId || undefined, {
      ...context,
    });
  }
};
