import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-[42px] font-bold text-fg">404</h1>
      <p className="mt-2 text-[15px] text-fg-2">This page doesn&apos;t exist.</p>
      <Button href="/" className="mt-5">
        Back to strategies
      </Button>
    </div>
  );
}
