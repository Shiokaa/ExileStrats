import { HomeView } from '@/features/strategy/components/home-view';
import { getStrategies } from '@/features/strategy/queries';

// Reads from the database at request time (no DB at build).
export const dynamic = 'force-dynamic';

export default async function Home() {
  const strategies = await getStrategies();
  return <HomeView strategies={strategies} />;
}
