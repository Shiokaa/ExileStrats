import Link from 'next/link';
import styles from './footer.module.css';
import { LogoMark } from './logo-mark';

const FOOTER_LINKS = [
  { href: '/', label: 'Strategies' },
  { href: '/mechanics', label: 'Mechanics' },
  { href: '/tier-list', label: 'Tier list' },
  { href: '/guides', label: 'Guides' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" className="logo">
          <span className="logo__mark">
            <LogoMark size={18} />
          </span>
          <span className="logo__word">EXILESTRATS</span>
        </Link>
        <nav className={styles.links} aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className={styles.notice}>
        This product isn&apos;t affiliated with or endorsed by Grinding Gear Games in any way.
      </p>
    </footer>
  );
}
