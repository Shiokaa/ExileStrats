import Link from 'next/link';
import { LogoMark } from './logo-mark';

export function Logo({ markSize = 20 }: { markSize?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-[11px] no-underline">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
        <LogoMark size={markSize} />
      </span>
      <span className="font-display text-[19px] font-bold leading-none tracking-[0.015em] text-fg">
        EXILESTRATS
      </span>
    </Link>
  );
}
