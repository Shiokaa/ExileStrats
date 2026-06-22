import { HomeView } from '@/features/strategy/components/home-view';
import { sampleStrategies } from '@/features/strategy/data';

export default function Home() {
  // Slice ordering: hardcoded data for now — the data-access layer lands with persistence.
  return <HomeView strategies={sampleStrategies} />;
}
