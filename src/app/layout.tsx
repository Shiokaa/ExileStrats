import type { Metadata } from 'next';
import { Saira_Condensed, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AmbientBackground } from '@/components/ambient-background';
import { SiteNav } from '@/components/site-nav';

const display = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'ExileStrats',
  description: 'Path of Exile mapping strategies as clean, scannable fiches.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <ThemeProvider>
          <AmbientBackground />
          <div className="shell">
            <SiteNav />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
