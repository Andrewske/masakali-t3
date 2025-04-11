'use client';
import { useEffect } from 'react';
import type Error from 'next/error';
import posthog from 'posthog-js';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Error</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
