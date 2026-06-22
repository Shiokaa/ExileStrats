import type { z } from 'zod';
import type {
  atlasTreeSchema,
  difficultySchema,
  scarabSchema,
  strategyContentSchema,
  strategySummarySchema,
  tierSchema,
} from './schema';

export type Difficulty = z.infer<typeof difficultySchema>;
export type Tier = z.infer<typeof tierSchema>;
export type StrategySummary = z.infer<typeof strategySummarySchema>;
export type StrategyContent = z.infer<typeof strategyContentSchema>;
export type Scarab = z.infer<typeof scarabSchema>;
export type AtlasTree = z.infer<typeof atlasTreeSchema>;

/** Full strategy = relational summary + versioned content blob. */
export interface StrategyDetail {
  summary: StrategySummary;
  content: StrategyContent;
}
