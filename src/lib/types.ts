export type MechanicKey =
  | 'harvest'
  | 'breach'
  | 'legion'
  | 'essence'
  | 'blight'
  | 'ritual'
  | 'expedition'
  | 'ambush'
  | 'delirium';

export type Difficulty = 1 | 2 | 3;

export type Tier = 'S' | 'A' | 'B' | 'C';

export interface Scarab {
  /** Internal art id (resolved to an icon once the data pipeline exists). */
  id: string;
  name: string;
}

/** Atlas tree — V1 niveau 0 only: a planner link or a captured image. */
export type AtlasTree = { kind: 'link'; url: string } | { kind: 'image'; url: string };

export interface StrategyFiche {
  title: string;
  author: string;
  league: string;
  mechanic: MechanicKey;
  mechanicTags: MechanicKey[];
  tier?: Tier;
  difficulty: Difficulty;
  summary: {
    farms: string;
    investPerMap: string;
    profitPerHour: string;
    snapshotLeague: string;
  };
  /** Map device — up to 5 scarabs (+ free modifiers like sextants/kirac). */
  mapDevice: {
    scarabs: Scarab[];
    extras?: string[];
  };
  atlasTree: AtlasTree;
  steps: string[];
  maps: {
    names: string[];
    note?: string;
  };
  media?: {
    youtube?: string;
  };
  notes?: string;
  updatedDaysAgo: number;
}
