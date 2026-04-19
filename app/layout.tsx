import type { Metadata } from 'next';
import { OrganizationSchema, LocalBizGlobalSchema } from '@/lib/schemas';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bambora.agency'),
  title: 'BAMBORA — Producción audiovisual para eventos corporativos',
  description: 'Producción audiovisual de alta calidad para eventos corporativos en toda España.',
  verification: {
    google: '0m1TWJmc9xxeGqWYVuzpbDu3A_crzp1mqY1UpaI7h2c',
  },
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'BAMBORA',
    locale: 'es_ES',
    type: 'website',
    title: 'BAMBORA — Producción audiovisual para eventos corporativos',
    description: 'Producción audiovisual de alta calidad para eventos corporativos en toda España.',
    url: 'https://www.bambora.agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAMBORA — Producción audiovisual para eventos corporativos',
    description: 'Producción audiovisual de alta calidad para eventos corporativos en toda España.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <OrganizationSchema />
        <LocalBizGlobalSchema />
        <div className="grain"></div>

        <nav>
          <div className="nav-logo">
            <a href="/">Bambora</a>
          </div>
          <div className="nav-right">
            <a href="/#proyectos">Proyectos</a>
            <a href="mailto:hello@bambora.agency">Contacto</a>
            <div className="nav-dot"></div>
          </div>
        </nav>

        {children}

        <footer>
          <div className="footer-brand">Bambora © 2026</div>
          <div className="footer-loc">Toda España</div>
        </footer>
      </body>
    </html>
  );
}
