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
      <h1 className="font-display text-[2rem] font-bold text-fg">Something went wrong</h1>
      <p className="mt-2 text-[0.9375rem] text-fg-2">An unexpected error occurred.</p>
      {error.digest && <p className="mt-1 text-xs text-fg-3">Ref: {error.digest}</p>}
      <Button type="button" className="mt-5" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
