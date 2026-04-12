import { MetadataRoute } from 'next';
import { categorias, ubicaciones } from '@/data';

const SITE_URL = 'https://www.bambora.agency';

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryLocationEntries = categorias.flatMap((categoria) =>
    ubicaciones.map((ubicacion) => ({
      url: `${SITE_URL}/${categoria.slug}/${ubicacion.slug}/`,
      lastModified: new Date(),
      priority: 0.8,
    }))
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...categoryLocationEntries,
  ];
}