import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MECHANICS, MECHANIC_KEYS, type MechanicKey } from '@/data/game/mechanics';
import { sampleStrategies } from '@/features/strategy/data';
import { MechanicHub } from '@/features/mechanic/components/mechanic-hub';

type Params = { params: Promise<{ mechanic: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { mechanic } = await params;
  if (!MECHANIC_KEYS.includes(mechanic as MechanicKey)) {
    return { title: 'Mechanic not found · ExileStrats' };
  }
  const key = mechanic as MechanicKey;
  return { title: `${MECHANICS[key].name} · ExileStrats` };
}

export default async function MechanicPage({ params }: Params) {
  const { mechanic } = await params;
  if (!MECHANIC_KEYS.includes(mechanic as MechanicKey)) {
    notFound();
  }
  const key = mechanic as MechanicKey;
  const strategies = sampleStrategies.filter((s) => s.mechanic === key);
  return <MechanicHub mechanicKey={key} strategies={strategies} />;
}
