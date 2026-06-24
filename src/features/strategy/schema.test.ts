import { expect, test } from 'vitest';
import { strategyContentSchema } from './schema';

const valid = {
  schemaVersion: 1,
  summary: { farms: 'Lifeforce', snapshotLeague: 'Settlers' },
  mapDevice: { scarabs: [{ id: 'x', name: 'Wisps', mechanic: 'harvest' }] },
  atlasTree: { kind: 'link', url: 'https://poeplanner.com/abc' },
  steps: ['Roll maps', 'Run them'],
  maps: { names: [] },
};

test('strategyContentSchema — valid v1 parses', () => {
  expect(strategyContentSchema.parse(valid)).toMatchObject({ schemaVersion: 1 });
});

test('strategyContentSchema — rejects unknown schemaVersion (discriminated union)', () => {
  expect(() => strategyContentSchema.parse({ ...valid, schemaVersion: 2 })).toThrow();
});

test('strategyContentSchema — rejects an invalid atlas planner URL', () => {
  expect(() =>
    strategyContentSchema.parse({ ...valid, atlasTree: { kind: 'link', url: 'not-a-url' } }),
  ).toThrow();
});

test('strategyContentSchema — rejects more than 5 scarabs', () => {
  const scarabs = Array.from({ length: 6 }, (_, i) => ({
    id: `s${i}`,
    name: `S${i}`,
    mechanic: 'harvest',
  }));
  expect(() => strategyContentSchema.parse({ ...valid, mapDevice: { scarabs } })).toThrow();
});
