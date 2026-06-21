import { expect, test } from 'vitest';
import { APP_NAME, TARGET_GAME } from './app';

test('app identity constants', () => {
  expect(APP_NAME).toBe('ExileStrats');
  expect(TARGET_GAME).toBe('Path of Exile 1');
});
