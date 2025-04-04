'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { env } from '~/env';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      !window.location.host.includes('127.0.0.1') &&
      !window.location.host.includes('localhost')
    ) {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true,
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
