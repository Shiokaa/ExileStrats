import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fiche } from '@/features/strategy/components/fiche';
import { getStrategyBySlug, getSimilarStrategies } from '@/features/strategy/queries';
import { getCurrentUser } from '@/lib/supabase/server';

// Ownership depends on the signed-in user → never statically cache.
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getStrategyBySlug(slug);
  if (!detail) return { title: 'Strategy not found · ExileStrats' };
  return { title: `${detail.summary.title} · ExileStrats` };
}

export default async function StrategyPage({ params }: Params) {
  const { slug } = await params;
  const result = await getStrategyBySlug(slug);
  if (!result) notFound();

  // Keep authorId server-side; only a boolean reaches the client.
  const { authorId, ...detail } = result;
  const user = await getCurrentUser();
  const isOwner = !!user && authorId === user.id;

  const similar = await getSimilarStrategies(slug, detail.summary.mechanic);
  return <Fiche detail={detail} similar={similar} isOwner={isOwner} slug={slug} />;
}
