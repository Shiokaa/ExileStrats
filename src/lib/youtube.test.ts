import { expect, test } from 'vitest';
import { parseYouTubeId } from './youtube';

const ID = 'dQw4w9WgXcQ';

test('parseYouTubeId — standard watch URL', () => {
  expect(parseYouTubeId(`https://www.youtube.com/watch?v=${ID}`)).toBe(ID);
});

test('parseYouTubeId — watch URL with params before v=', () => {
  expect(parseYouTubeId(`https://www.youtube.com/watch?list=PLabc&v=${ID}`)).toBe(ID);
});

test('parseYouTubeId — youtu.be / embed / shorts / live', () => {
  expect(parseYouTubeId(`https://youtu.be/${ID}`)).toBe(ID);
  expect(parseYouTubeId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
  expect(parseYouTubeId(`https://www.youtube.com/shorts/${ID}`)).toBe(ID);
  expect(parseYouTubeId(`https://www.youtube.com/live/${ID}`)).toBe(ID);
});

test('parseYouTubeId — bare 11-char id', () => {
  expect(parseYouTubeId(ID)).toBe(ID);
  expect(parseYouTubeId(`  ${ID}  `)).toBe(ID);
});

test('parseYouTubeId — invalid input returns null', () => {
  expect(parseYouTubeId('https://example.com/video')).toBeNull();
  expect(parseYouTubeId('tooshort')).toBeNull();
  expect(parseYouTubeId('')).toBeNull();
});
