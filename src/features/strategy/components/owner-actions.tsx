'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteStrategyAction } from '@/features/strategy/actions';
import { Button } from '@/components/ui/button';

/**
 * Edit + Delete controls shown only to a strategy's author. `redirectTo` navigates after a
 * successful delete (e.g. the fiche → "/profile"); omit it to just refresh the current list.
 */
export function OwnerActions({ slug, redirectTo }: { slug: string; redirectTo?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    if (!window.confirm('Delete this strategy? This cannot be undone.')) return;
    setError(null);
    setBusy(true);
    const result = await deleteStrategyAction(slug);
    if (result.ok) {
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    } else {
      setBusy(false);
      setError(result.error);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button href={`/strategy/${slug}/edit`}>Edit</Button>
      <Button type="button" onClick={onDelete} disabled={busy} className="text-danger">
        {busy ? 'Deleting…' : 'Delete'}
      </Button>
      {error && <span className="text-[12px] text-danger">{error}</span>}
    </div>
  );
}
