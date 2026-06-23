import Link from 'next/link';
import type { Metadata } from 'next';
import { CreateForm } from '@/features/strategy/components/create-form';
import { getCurrentUser } from '@/lib/supabase/server';
import { Breadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = {
  title: 'Create a strategy — ExileStrats',
  description: 'Document a reproducible Path of Exile mapping strategy and share it.',
};

// Auth-gated — never statically cache an auth state.
export const dynamic = 'force-dynamic';

export default async function CreatePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-0 pt-[36px]">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'New strategy' }]} />

      <header className="mb-[26px]">
        <h1 className="text-[42px] font-bold leading-[1] text-fg">Share your strategy</h1>
        <p className="mt-[12px] max-w-[600px] text-[15px] leading-[1.55] text-fg-2">
          Document a reproducible method. Enter numbers you measured on your own maps — the
          community can then comment and rate.
        </p>
      </header>

      {user ? (
        <CreateForm />
      ) : (
        <div className="glass-card flex flex-col items-center gap-4 rounded-panel p-[40px] text-center">
          <p className="max-w-[420px] text-[15px] leading-[1.55] text-fg-2">
            Sign in to compose and publish a strategy.
          </p>
          <Link href="/auth" className="btn btn-primary">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
