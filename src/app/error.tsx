'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-[32px] font-bold text-fg">Something went wrong</h1>
      <p className="mt-2 text-[15px] text-fg-2">An unexpected error occurred.</p>
      {error.digest && <p className="mt-1 text-[12px] text-fg-3">Ref: {error.digest}</p>}
      <Button type="button" className="mt-5" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
