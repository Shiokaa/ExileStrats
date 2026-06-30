import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service — ExileStrats' };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[45rem] pt-12">
      <h1 className="font-display text-[2.625rem] font-bold text-fg">Terms of Service</h1>
      <p className="mt-4 text-[0.9375rem] leading-[1.6] text-fg-2">
        {/* ponytail: placeholder — real terms to be written before public launch. */}
        Placeholder. The terms of service will be published here before launch.
      </p>
      <p className="mt-4 text-[0.8125rem] leading-[1.6] text-fg-3">
        This product isn&apos;t affiliated with or endorsed by Grinding Gear Games in any way.
      </p>
    </div>
  );
}
