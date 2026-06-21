import Link from 'next/link';
import { LogoMark } from './logo-mark';
import { ThemeToggle } from './theme-toggle';

export function SiteNav() {
  return (
    <nav className="nav">
      <Link href="/" className="logo">
        <span className="logo__mark">
          <LogoMark size={20} />
        </span>
        <span className="logo__word">EXILESTRATS</span>
      </Link>
      <ThemeToggle />
    </nav>
  );
}
