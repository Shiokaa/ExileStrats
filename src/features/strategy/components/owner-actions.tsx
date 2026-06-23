'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteStrategyAction } from '@/features/strategy/actions';

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
      <Link href={`/strategy/${slug}/edit`} className="btn btn-ghost">
        Edit
      </Link>
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="btn btn-ghost text-[#C0392B] disabled:opacity-60"
      >
        {busy ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span className="text-[12px] text-[#C0392B]">{error}</span>}
    </div>
  );
}
