import type { Metadata } from 'next';
import { Saira_Condensed, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { AmbientBackground } from '@/components/layout/ambient-background';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
            <Header />
            <main className="shell__main">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
