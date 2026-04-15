import { MetadataRoute } from 'next';
import { categorias } from '@/data';

const SITE_URL = 'https://www.bambora.agency';

// SEO: 20 categorías × 40 ubicaciones = 800 URLs cuasi-idénticas = doorway pages
// que Google penaliza. Declaramos solo las 20 categorías "hub" para maximizar
// el crawl budget. Las combinaciones categoría/ubicación siguen accesibles
// pero llevan noindex a nivel de página.

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries = categorias.map((categoria) => ({
    url: `${SITE_URL}/${categoria.slug}/`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}