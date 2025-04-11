import { env } from '~/env';

export default async function PostHogClient() {
  const { PostHog } = await import('posthog-node');
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: 'https://us.i.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
