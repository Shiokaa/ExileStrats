import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fiche } from '@/features/strategy/components/fiche';
import { getStrategyDetail } from '@/features/strategy/detail-data';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = getStrategyDetail(slug);
  if (!detail) return { title: 'Strategy not found · ExileStrats' };
  return { title: `${detail.summary.title} · ExileStrats` };
}

export default async function StrategyPage({ params }: Params) {
  const { slug } = await params;
  const detail = getStrategyDetail(slug);
  if (!detail) notFound();
  return <Fiche detail={detail} />;
}
