const PATTERNS = [
  /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
  /(?:youtu\.be\/)([\w-]{11})/,
  /(?:youtube\.com\/embed\/)([\w-]{11})/,
  /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  /(?:youtube\.com\/live\/)([\w-]{11})/,
];

/** Extract an 11-char YouTube video id from a URL (or null). */
export function parseYouTubeId(url: string): string | null {
  const u = url.trim();
  for (const re of PATTERNS) {
    const m = u.match(re);
    if (m) return m[1];
  }
  return /^[\w-]{11}$/.test(u) ? u : null;
}

export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;

export const youtubeThumbUrl = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
