import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 42 }}>404</h1>
      <p style={{ color: 'var(--text-2)', marginTop: 8 }}>This page doesn&apos;t exist.</p>
      <Button href="/" style={{ marginTop: 20 }}>
        Back to strategies
      </Button>
    </div>
  );
}
