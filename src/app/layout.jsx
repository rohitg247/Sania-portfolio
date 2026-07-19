import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { PROFILE } from '@/lib/constants';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const description =
  'Digital Marketing Manager with 5+ years driving lead generation for real estate and consumer brands through Google Ads, Meta campaigns, hyper-local SEO and in-house creative.';

export const metadata = {
  // Netlify injects URL at build time; localhost keeps dev warnings quiet.
  metadataBase: new URL(process.env.URL || 'http://localhost:3000'),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF8F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F14' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${syne.variable}`}>
      <body>
        {/*
          Framer Motion serialises its `initial` state into the SSR markup, so every
          scroll-reveal element ships as opacity:0. Without JS those styles are never
          animated away and the whole page below the hero stays invisible. This forces
          them visible when scripting is off; it costs nothing when JS runs.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
