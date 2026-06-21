'use client';

import { useState } from 'react';

export function CopyForDiscord({ text, className }: { text: string; className?: string }) {
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
    <button type="button" className={className} onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy for Discord'}
    </button>
  );
}
