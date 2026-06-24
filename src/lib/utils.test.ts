import { expect, test } from 'vitest';
import { formatInvest, formatReturn, formatUpdated } from './utils';

test('formatReturn — one decimal, neutral wording', () => {
  expect(formatReturn(2.4)).toBe('~2.4 div / h');
  expect(formatReturn(0)).toBe('~0.0 div / h');
});

test('formatInvest — rounded chaos per map', () => {
  expect(formatInvest(12)).toBe('~12c / map');
  expect(formatInvest(12.6)).toBe('~13c / map');
});

test('formatUpdated — relative label boundaries', () => {
  expect(formatUpdated(0)).toBe('updated today');
  expect(formatUpdated(1)).toBe('updated 1d ago');
  expect(formatUpdated(100)).toBe('updated 100d ago');
});
