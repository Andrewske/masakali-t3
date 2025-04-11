'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Button from '~/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="grid place-items-center gap-4">
      <h2>Uh oh! Something went wrong</h2>

      <Button
        handleClick={() => reset()}
        callToAction="Try Again"
        isWhite={false}
      />
      <Button
        href="/villas"
        callToAction="Back to villas"
        isWhite={false}
      />
    </div>
  );
}
