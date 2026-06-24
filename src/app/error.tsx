'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32 }}>Something went wrong</h1>
      <p style={{ color: 'var(--text-2)', marginTop: 8 }}>An unexpected error occurred.</p>
      <Button type="button" style={{ marginTop: 20 }} onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
