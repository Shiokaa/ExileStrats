import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy — ExileStrats' };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] pt-12">
      <h1 className="font-display text-[42px] font-bold text-fg">Privacy Policy</h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-fg-2">
        {/* ponytail: placeholder — real policy to be written before public launch. */}
        Placeholder. The privacy policy will be published here before launch.
      </p>
      <p className="mt-4 text-[13px] leading-[1.6] text-fg-3">
        This product isn&apos;t affiliated with or endorsed by Grinding Gear Games in any way.
      </p>
    </div>
  );
}
