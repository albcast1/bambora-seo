import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bambora.agency'),
  title: 'BAMBORA \u2014 Producci\u00f3n audiovisual para eventos corporativos',
  description: 'Producci\u00f3n audiovisual de alta calidad para eventos corporativos en toda Espa\u00f1a.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
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
