import type { StrategyFiche } from '@/lib/types';

/** Slice 1: a hand-written strategy rendered as a fiche — no DB, no auth. */
export const sampleStrategy: StrategyFiche = {
  title: 'Harvest Lifeforce Juicing',
  author: 'Exileph',
  league: 'Settlers',
  mechanic: 'harvest',
  mechanicTags: ['harvest'],
  tier: 'A',
  difficulty: 2,
  summary: {
    farms: 'Sacred & Vivid Lifeforce',
    investPerMap: '~12c / map',
    profitPerHour: '~2.4 div / h',
    snapshotLeague: 'est. 3.25',
  },
  mapDevice: {
    scarabs: [
      { id: 'harvest_sacred_grove', name: 'Sacred Grove Scarab' },
      { id: 'harvest_wilds', name: 'Scarab of the Wilds' },
      { id: 'harvest_lifeforce', name: 'Lifeforce Scarab' },
      { id: 'harvest_bounty', name: 'Bountiful Scarab' },
      { id: 'harvest_growth', name: 'Scarab of Growth' },
    ],
    extras: ['Kirac: Harvest', 'Sextant: Plants have +1 lifeforce'],
  },
  atlasTree: {
    kind: 'link',
    url: 'https://www.pathofexile.com/atlas-skill-tree',
  },
  steps: [
    'Run the harvest crop fully before touching the rest of the map — the rare monsters can be deadly.',
    'Prioritise the purple (sacred) and blue (vivid) crops; yellow is filler.',
    'Hold lifeforce, batch your crafts, and sell in bulk rather than per-map.',
    'Skip the harvest if the layout splits it across the map — the walk eats your clear speed.',
  ],
  maps: {
    names: ['Strand', 'Cemetery', 'City Square'],
    note: 'Open layouts so the crop spawns in one reachable cluster.',
  },
  media: {
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  notes:
    'Numbers are a manual, timestamped snapshot — lifeforce prices swing hard within a league, treat them as a ballpark.',
  updatedDaysAgo: 2,
};
