import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { CreateForm, type CreateFormInitial } from '@/features/strategy/components/create-form';
import { getStrategyBySlug } from '@/features/strategy/queries';
import { getCurrentUser } from '@/lib/supabase/server';

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
    farms: content.summary.farms,
    summary: content.notes ?? '',
    steps: content.steps,
    scarabs: content.mapDevice.scarabs.map((s) => s.name),
    atlasLink: content.atlasTree.url,
  };

  return (
    <div className="flex flex-col gap-0 pt-[36px]">
      <nav
        className="mb-[18px] flex items-center gap-[6px] text-[13px] text-fg-3"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-fg-3 no-underline transition-colors hover:text-fg-2">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/strategy/${slug}`}
          className="text-fg-3 no-underline transition-colors hover:text-fg-2"
        >
          {summary.title}
        </Link>
        <span>/</span>
        <span className="text-fg-2">Edit</span>
      </nav>

      <header className="mb-[26px]">
        <h1 className="text-[42px] font-bold leading-[1] text-fg">Edit your strategy</h1>
        <p className="mt-[12px] max-w-[600px] text-[15px] leading-[1.55] text-fg-2">
          Update the numbers and method. The link to this strategy stays the same.
        </p>
      </header>

      <CreateForm mode="edit" slug={slug} initial={initial} />
    </div>
  );
}
