import { DIFFICULTY, MECHANICS } from './mechanics';
import type { StrategyFiche } from './types';

const GGG_NOTICE =
  "This product isn't affiliated with or endorsed by Grinding Gear Games in any way.";

/** Clean text summary for the "Copy for Discord" action. */
export function buildDiscordSummary(s: StrategyFiche): string {
  const tags = s.mechanicTags.map((m) => MECHANICS[m].name).join(', ');
  const lines = [
    `**${s.title}** — ${tags} · ${s.league} (by ${s.author})`,
    `What you farm: ${s.summary.farms}`,
    `Invest ${s.summary.investPerMap} · Est. return ${s.summary.profitPerHour} · Difficulty: ${DIFFICULTY[s.difficulty].label}`,
    `Map device: ${s.mapDevice.scarabs.map((x) => x.name).join(', ')}`,
    '',
    'How to play:',
    ...s.steps.map((t, i) => `${i + 1}. ${t}`),
  ];
  if (s.media?.youtube) lines.push('', `Video: ${s.media.youtube}`);
  lines.push('', GGG_NOTICE);
  return lines.join('\n');
}
