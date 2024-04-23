'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';

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

      <Button onClick={() => reset()}>Try Again</Button>
      <Button>
        <Link href="/villas">Back to villas</Link>
      </Button>
    </div>
  );
}
