import type { Metadata } from 'next';
import { Saira_Condensed, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AmbientBackground } from '@/components/layout/ambient-background';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const saira = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-saira',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'ExileStrats',
  description: 'Path of Exile mapping strategies as clean, scannable fiches.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${saira.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body>
        <AmbientBackground />
        <div className="relative z-[1] mx-auto flex min-h-screen max-w-[1080px] flex-col px-6">
          <Header />
          <main className="flex-1 pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
