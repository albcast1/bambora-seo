import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bambora.agency'),
  title: 'BAMBORA — Producción audiovisual para eventos corporativos',
  description: 'Producción audiovisual de alta calidad para eventos corporativos en toda España.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <nav className="nav">
          <div className="nav-logo">
            <a href="/">Bambora</a>
          </div>
          <div className="nav-right">
            <a href="/#proyectos">Proyectos</a>
            <a href="mailto:hello@bambora.agency">Contacto</a>
            <span className="nav-dot"></span>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-brand">Bambora © 2026</div>
          <div className="footer-loc">Toda España</div>
        </footer>
      </body>
    </html>
  );
}