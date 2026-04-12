import React from 'react';

const SITE_URL = 'https://www.bambora.agency';

// Type definitions
interface Ubicacion {
  slug: string;
  nombre: string;
  tipo: string;
  comunidad: string;
  descripcion: string;
  venues: string;
  logistica: string;
}

interface Servicio {
  nombre?: string;
  [key: string]: any;
}

interface Categoria {
  slug: string;
  nombre: string;
  nombreCorto: string;
  titulo: string;
  descripcionCorta: string;
  intro: string;
  servicios: string[] | Servicio[];
  keywords: string[];
  faq: Array<{ pregunta: string; respuesta: string }>;
  relacionadas: string[];
}

interface FAQItem {
  pregunta: string;
  respuesta: string;
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bambora',
    email: 'hello@bambora.agency',
    url: SITE_URL,
    areaServed: 'ES',
    image: `${SITE_URL}/logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema
export function LocalBusinessSchema({ ubicacion }: { ubicacion: Ubicacion }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Bambora - Producción Audiovisual en ${ubicacion.nombre}`,
    url: `${SITE_URL}/${ubicacion.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ubicacion.nombre,
      addressRegion: ubicacion.comunidad,
      addressCountry: 'ES',
    },
    areaServed: {
      '@type': 'City',
      name: ubicacion.nombre,
    },
    description: ubicacion.descripcion,
    email: 'hello@bambora.agency',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema with Offer Catalog
export function ServiceSchema({
  categoria,
  ubicacion,
}: {
  categoria: Categoria;
  ubicacion: Ubicacion;
}) {
  const servicios = Array.isArray(categoria.servicios)
    ? categoria.servicios.map((s) => (typeof s === 'string' ? s : s.nombre || s))
    : [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${categoria.nombre} en ${ubicacion.nombre}`,
    description: categoria.descripcionCorta,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Bambora',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: ubicacion.nombre,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Servicios de ${categoria.nombreCorto}`,
      itemListElement: servicios.map((servicio, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: typeof servicio === 'string' ? servicio : servicio,
        availability: 'https://schema.org/InStock',
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FAQSchema({ faq }: { faq: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.respuesta,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  categoria,
  ubicacion,
}: {
  categoria: Categoria;
  ubicacion: Ubicacion;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoria.nombre,
        item: `${SITE_URL}/${categoria.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${categoria.nombre} en ${ubicacion.nombre}`,
        item: `${SITE_URL}/${categoria.slug}/${ubicacion.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// How To Schema
export function HowToSchema({
  categoria,
  ubicacion,
}: {
  categoria: Categoria;
  ubicacion: Ubicacion;
}) {
  const steps = [
    {
      position: 1,
      name: 'Solicita tu presupuesto',
      text: `Contacta con Bambora para describir tu evento y necesidades de ${categoria.nombreCorto} en ${ubicacion.nombre}. Nuestro equipo evaluará tu proyecto y te proporcionará un presupuesto personalizado en 24 horas.`,
    },
    {
      position: 2,
      name: 'Planificación y preproducción',
      text: `Coordinamos los detalles logísticos, ubicaciones de grabación, permisos necesarios y equipamiento especializado para tu evento de ${categoria.nombreCorto}. Realizamos una reunión de briefing con stakeholders principales.`,
    },
    {
      position: 3,
      name: 'Grabación en el evento',
      text: `Nuestro equipo de profesionales se desplaza a ${ubicacion.nombre} con equipamiento de cine profesional para capturar toda la cobertura de ${categoria.nombreCorto}. Trabajamos discretamente sin interrumpir la experiencia de los asistentes.`,
    },
    {
      position: 4,
      name: 'Edición y postproducción',
      text: `Editamos el material con estándares de cine profesional, incluyendo corrección de color, sonido envolvente y efectos visuales. Generamos múltiples formatos y versiones para tus necesidades de distribución.`,
    },
    {
      position: 5,
      name: 'Entrega y lanzamiento',
      text: `Entregas el contenido final sin marca de agua en múltiples formatos (4K, 1080p, vertical para redes). Incluimos sesión de capacitación sobre cómo maximizar el uso del material en tus canales.`,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Cómo contratar ${categoria.nombreCorto} en ${ubicacion.nombre}`,
    description: `Guía paso a paso para contratar nuestros servicios de ${categoria.nombreCorto} profesional en ${ubicacion.nombre}.`,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review Schema
export function ReviewSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: 'Cliente Bambora',
    },
    reviewBody:
      'Excelente equipo de profesionales. Entregaron el vídeo antes del plazo, superó nuestras expectativas en calidad y creatividad. Recomendamos sinceramente a Bambora para cualquier producción audiovisual corporativa.',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Bambora',
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}