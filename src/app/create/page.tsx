import Link from 'next/link';
import type { Metadata } from 'next';
import { CreateForm } from '@/features/strategy/components/create-form';

export const metadata: Metadata = {
  title: 'Create a strategy — ExileStrats',
  description: 'Document a reproducible Path of Exile mapping strategy and share it.',
};

export default function CreatePage() {
  return (
    <div className="flex flex-col gap-0 pt-[36px]">
      {/* Breadcrumb */}
      <nav
        className="mb-[18px] flex items-center gap-[6px] text-[13px] text-fg-3"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-fg-3 no-underline hover:text-fg-2 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-fg-2">New strategy</span>
      </nav>

      <header className="mb-[26px]">
        <h1 className="text-[42px] font-bold leading-[1] text-fg">Share your strategy</h1>
        <p className="mt-[12px] max-w-[600px] text-[15px] leading-[1.55] text-fg-2">
          Document a reproducible method. Enter numbers you measured on your own maps — the
          community can then comment and rate.
        </p>
      </header>

      <CreateForm />
    </div>
  );
}
