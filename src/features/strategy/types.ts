import type { z } from 'zod';
import type {
  difficultySchema,
  strategyContentSchema,
  strategySummarySchema,
  tierSchema,
} from './schema';

export type Difficulty = z.infer<typeof difficultySchema>;
export type Tier = z.infer<typeof tierSchema>;
export type StrategySummary = z.infer<typeof strategySummarySchema>;
export type StrategyContent = z.infer<typeof strategyContentSchema>;
