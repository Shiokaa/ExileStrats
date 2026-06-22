import Link from 'next/link';
import styles from './header.module.css';
import { LogoMark } from './logo-mark';
import { ThemeToggle } from './theme-toggle';

const NAV_LINKS = [
  { href: '/', label: 'Strategies' },
  { href: '/mechanics', label: 'Mechanics' },
  { href: '/tier-list', label: 'Tier list' },
  { href: '/guides', label: 'Guides' },
];

export function Header() {
  return (
    <header className={styles.nav}>
      <Link href="/" className="logo">
        <span className="logo__mark">
          <LogoMark size={20} />
        </span>
        <span className="logo__word">EXILESTRATS</span>
      </Link>

      <nav className={styles.links} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <ThemeToggle />
        <button type="button" className="btn btn--ghost">
          Sign in
        </button>
      </div>
    </header>
  );
}
