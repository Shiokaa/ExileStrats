import type { Metadata } from 'next';
import { CreateForm } from '@/features/strategy/components/create-form';
import { getCurrentUser } from '@/lib/supabase/server';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Create a strategy — ExileStrats',
  description: 'Document a reproducible Path of Exile mapping strategy and share it.',
};

// Auth-gated — never statically cache an auth state.
export const dynamic = 'force-dynamic';

export default async function CreatePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-0 pt-9">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'New strategy' }]} />

      <header className="mb-6.5">
        <p className="eyebrow mb-2.5">New strategy</p>
        <h1 className="font-display text-[2.625rem] font-bold leading-[1] text-fg">
          Share your strategy
        </h1>
        <p className="mt-3 max-w-[37.5rem] text-[0.9375rem] leading-[1.55] text-fg-2">
          Document a reproducible method. Enter numbers you measured on your own maps — the
          community can then comment and rate.
        </p>
      </header>

      {user ? (
        <CreateForm />
      ) : (
        <div className="glass-card flex flex-col items-center gap-4 rounded-panel p-10 text-center">
          <p className="max-w-[26.25rem] text-[0.9375rem] leading-[1.55] text-fg-2">
            Sign in to compose and publish a strategy.
          </p>
          <Button href="/auth" variant="primary">
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}
