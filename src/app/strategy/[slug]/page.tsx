import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fiche } from '@/features/strategy/components/fiche';
import { getStrategyBySlug, getSimilarStrategies } from '@/features/strategy/queries';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getStrategyBySlug(slug);
  if (!detail) return { title: 'Strategy not found · ExileStrats' };
  return { title: `${detail.summary.title} · ExileStrats` };
}

export default async function StrategyPage({ params }: Params) {
  const { slug } = await params;
  const detail = await getStrategyBySlug(slug);
  if (!detail) notFound();
  const similar = await getSimilarStrategies(slug, detail.summary.mechanic);
  return <Fiche detail={detail} similar={similar} />;
}
