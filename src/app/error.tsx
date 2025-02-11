'use client';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import type Error from 'next/error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // useEffect(() => {
  //   if (error) {
  //     // send error to server
  //     console.log(error.digest);
  //   }
  // }, [error.digest]);

  return (
    <div className="min-h-screen">
      <h1>Error</h1>
      {/* <p>{error.message}</p> */}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
