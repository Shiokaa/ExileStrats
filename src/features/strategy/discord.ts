import { MECHANICS } from '@/data/game/mechanics';
import { DIFFICULTY } from './labels';
import { formatInvest, formatReturn } from '@/lib/utils';
import type { StrategyDetail } from './types';

const GGG_NOTICE =
  "This product isn't affiliated with or endorsed by Grinding Gear Games in any way.";

/** Clean text summary for the "Copy for Discord" action. */
export function buildDiscordSummary({ summary, content }: StrategyDetail): string {
  const tags = summary.mechanicTags.map((m) => MECHANICS[m].name).join(', ');
  const lines = [
    `**${summary.title}** — ${tags} · ${summary.league} (by ${summary.author})`,
    `What you farm: ${content.summary.farms}`,
    `Invest ${formatInvest(summary.investPerMap)} · Est. return ${formatReturn(
      summary.returnPerHour,
    )} · Difficulty: ${DIFFICULTY[summary.difficulty]}`,
    `Map device: ${content.mapDevice.scarabs.map((s) => s.name).join(', ')}`,
    '',
    'How to play:',
    ...content.steps.map((t, i) => `${i + 1}. ${t}`),
  ];
  if (content.media?.youtube) lines.push('', `Video: ${content.media.youtube}`);
  lines.push('', GGG_NOTICE);
  return lines.join('\n');
}
