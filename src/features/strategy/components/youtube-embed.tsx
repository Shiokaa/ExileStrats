'use client';

import { useState } from 'react';
import { parseYouTubeId, youtubeEmbedUrl, youtubeThumbUrl } from '@/lib/youtube';

export function YoutubeEmbed({ url }: { url: string }) {
  const id = parseYouTubeId(url);
  const [playing, setPlaying] = useState(false);

  if (!id) return null;

  if (playing) {
    return (
      <div className="relative aspect-video w-[16.25rem] max-w-full overflow-hidden rounded-[0.6875rem] border border-border bg-black">
        <iframe
          src={youtubeEmbedUrl(id)}
          title="Strategy video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video"
      className="relative block aspect-video w-[16.25rem] max-w-full cursor-pointer overflow-hidden rounded-[0.6875rem] border border-border bg-black bg-cover bg-center"
      style={{ backgroundImage: `url('${youtubeThumbUrl(id)}')` }}
    >
      <span className="absolute inset-0 bg-black/30" />
      <span className="absolute left-1/2 top-1/2 flex h-10.5 w-10.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E11D2A]">
        <span className="ml-0.5 h-0 w-0 border-y-1.75 border-l-3 border-y-transparent border-l-white" />
      </span>
      <span className="absolute bottom-1.75 left-2 inline-flex items-center gap-1.5 rounded-[0.375rem] bg-black/60 px-2 py-0.75 text-[0.625rem] font-semibold text-white">
        YouTube
      </span>
    </button>
  );
}
