import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { CreateForm, type CreateFormInitial } from '@/features/strategy/components/create-form';
import { getStrategyBySlug } from '@/features/strategy/queries';
import { getCurrentUser } from '@/lib/supabase/server';
import { Breadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = { title: 'Edit strategy — ExileStrats' };

// Auth + ownership gated — never statically cache.
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export default async function EditStrategyPage({ params }: Params) {
  const { slug } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/auth');

  const result = await getStrategyBySlug(slug);
  if (!result) notFound();
  if (result.authorId !== user.id) notFound(); // not the owner → behave as if it doesn't exist

  const { summary, content } = result;
  const initial: CreateFormInitial = {
    title: summary.title,
    mechanic: summary.mechanic,
    league: summary.league,
    difficulty: summary.difficulty,
    returnRaw: summary.returnPerHour ? String(summary.returnPerHour) : '',
    investRaw: summary.investPerMap ? String(summary.investPerMap) : '',
    snapshotLabel: content.summary.snapshotLeague,
    farms: content.summary.farms,
    summary: content.notes ?? '',
    steps: content.steps,
    scarabs: content.mapDevice.scarabs.map((s) => s.name),
    atlasKind: content.atlasTree.kind,
    atlasLink: content.atlasTree.url,
    maps: content.maps.names,
    mapNote: content.maps.note ?? '',
    youtube: content.media?.youtube ?? '',
  };

  return (
    <div className="flex flex-col gap-0 pt-9">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: summary.title, href: `/strategy/${slug}` },
          { label: 'Edit' },
        ]}
      />

      <header className="mb-6.5">
        <h1 className="text-[2.625rem] font-bold leading-[1] text-fg">Edit your strategy</h1>
        <p className="mt-3 max-w-[37.5rem] text-[0.9375rem] leading-[1.55] text-fg-2">
          Update the numbers and method. The link to this strategy stays the same.
        </p>
      </header>

      <CreateForm mode="edit" slug={slug} initial={initial} />
    </div>
  );
}
