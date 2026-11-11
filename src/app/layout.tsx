import type { Metadata, Viewport } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { fontVariables } from '@/theme/fonts';
import { colors, cssVariables } from '@/theme/tokens';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PointerEffects from '@/components/ui/PointerEffects';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.nameLine}. ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: `${siteConfig.name} | ${siteConfig.nameLine}`,
    title: `${siteConfig.name} | ${siteConfig.nameLine}. ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: colors.base,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} style={cssVariables as CSSProperties}>
      <body>
        <AppRouterCacheProvider options={{ key: 'gvp' }}>
          <ThemeRegistry>
            <a href="#main" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <PointerEffects />
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
