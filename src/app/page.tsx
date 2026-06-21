import { Fiche } from '@/components/fiche/Fiche';
import { sampleStrategy } from '@/data/sample-strategy';

export default function Home() {
  return <Fiche strategy={sampleStrategy} />;
}
