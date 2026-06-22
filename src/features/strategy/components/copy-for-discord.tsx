'use client';

import { useState } from 'react';

export function CopyForDiscord({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-10 items-center gap-2 rounded-[11px] bg-[#5865F2] px-[15px] text-[13px] font-semibold text-white"
    >
      <span className="inline-block h-[9px] w-[9px] rounded-[2px] bg-white" />
      {copied ? 'Copied!' : 'Copy for Discord'}
    </button>
  );
}
