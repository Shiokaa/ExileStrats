'use client';

import { useState } from 'react';
import { parseYouTubeId, youtubeEmbedUrl, youtubeThumbUrl } from '@/lib/youtube';

export function YoutubeEmbed({ url }: { url: string }) {
  const id = parseYouTubeId(url);
  const [playing, setPlaying] = useState(false);

  if (!id) return null;

  if (playing) {
    return (
      <div className="relative aspect-video w-[260px] max-w-full overflow-hidden rounded-[11px] border border-border bg-black">
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
      className="relative block aspect-video w-[260px] max-w-full cursor-pointer overflow-hidden rounded-[11px] border border-border bg-black bg-cover bg-center"
      style={{ backgroundImage: `url('${youtubeThumbUrl(id)}')` }}
    >
      <span className="absolute inset-0 bg-black/30" />
      <span className="absolute left-1/2 top-1/2 flex h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E11D2A]">
        <span className="ml-[2px] h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
      </span>
      <span className="absolute bottom-[7px] left-2 inline-flex items-center gap-1.5 rounded-[6px] bg-black/60 px-2 py-[3px] text-[10px] font-semibold text-white">
        YouTube
      </span>
    </button>
  );
}
