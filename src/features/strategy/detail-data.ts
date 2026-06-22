import { MECHANICS } from '@/data/game/mechanics';
import { sampleStrategies } from './data';
import type { StrategyContent, StrategyDetail, StrategySummary } from './types';

/**
 * Hand-written full content blobs for a few strategies (no DB yet). Other slugs get a
 * sensible generated blob from their summary so every card link resolves. Replaced by
 * the data-access layer (validated with Zod) when persistence lands.
 */
const DETAILS: Record<string, StrategyContent> = {
  'harvest-lifeforce-juicing': {
    schemaVersion: 1,
    summary: { farms: 'Sacred & Vivid Lifeforce', snapshotLeague: 'est. 3.25' },
    mapDevice: {
      scarabs: [
        { id: 'harvest_sacred_grove', name: 'Sacred Grove Scarab', mechanic: 'harvest' },
        { id: 'harvest_wilds', name: 'Scarab of the Wilds', mechanic: 'harvest' },
        { id: 'harvest_lifeforce', name: 'Lifeforce Scarab', mechanic: 'harvest' },
        { id: 'expedition_remnants', name: 'Expedition Scarab', mechanic: 'expedition' },
        { id: 'ambush_abundance', name: 'Strongbox Scarab', mechanic: 'ambush' },
      ],
      extras: ['Kirac: Harvest', 'Sextant: Plants have +1 lifeforce'],
    },
    atlasTree: { kind: 'link', url: 'https://www.pathofexile.com/atlas-skill-tree' },
    steps: [
      'Run the Expedition first; place the detonators away from the Harvest benches.',
      'Harvest the purple (sacred) crops first, then the blue (vivid) ones.',
      'Open every strongbox before taking the map exit.',
      'Hold the lifeforce to reroll your relics at the bench at the end of the session.',
    ],
    maps: {
      names: ['Strand', 'Cemetery', 'City Square', 'Tropical Island'],
      note: 'Open layouts so the crop spawns in one reachable cluster.',
    },
    media: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    notes:
      'Swap the Strongbox Scarab for a Wandering Monster Scarab if you are short on quantity. Numbers are a manual snapshot — lifeforce prices swing hard within a league.',
  },
};

function defaultContent(summary: StrategySummary): StrategyContent {
  const mech = MECHANICS[summary.mechanic].name;
  return {
    schemaVersion: 1,
    summary: { farms: `${mech} drops`, snapshotLeague: 'est. 3.25' },
    mapDevice: {
      scarabs: Array.from({ length: Math.max(0, summary.scarabCount) }, (_, i) => ({
        id: `${summary.mechanic}_${i + 1}`,
        name: `${mech} Scarab ${i + 1}`,
        mechanic: summary.mechanic,
      })),
    },
    atlasTree: { kind: 'link', url: 'https://www.pathofexile.com/atlas-skill-tree' },
    steps: [
      `Set up the ${mech} mechanic before clearing the rest of the map.`,
      `Prioritise the ${mech} rewards, then clear for extra quantity.`,
      'Batch your loot and sell in bulk rather than per map.',
    ],
    maps: { names: ['Strand', 'Cemetery', 'City Square'], note: 'Open, fast layouts.' },
    media: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  };
}

export function getStrategyDetail(slug: string): StrategyDetail | null {
  const summary = sampleStrategies.find((s) => s.slug === slug);
  if (!summary) return null;
  return { summary, content: DETAILS[slug] ?? defaultContent(summary) };
}

/** Up to `limit` other strategies sharing the mechanic (then any), for the "similar" rail. */
export function getSimilarStrategies(slug: string, limit = 3): StrategySummary[] {
  const current = sampleStrategies.find((s) => s.slug === slug);
  if (!current) return [];
  const others = sampleStrategies.filter((s) => s.slug !== slug);
  const sameMechanic = others.filter((s) => s.mechanic === current.mechanic);
  const rest = others.filter((s) => s.mechanic !== current.mechanic);
  return [...sameMechanic, ...rest].slice(0, limit);
}
