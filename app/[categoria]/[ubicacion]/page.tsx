import React from 'react';
import { Metadata } from 'next';
import ubicaciones from '@/data/ubicaciones.json';
import categorias from '@/data/categorias.json';
import {
  OrganizationSchema,
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
  HowToSchema,
  ReviewSchema,
} from '@/lib/schemas';

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

interface Categoria {
  slug: string;
  nombre: string;
  nombreCorto: string;
  titulo: string;
  descripcionCorta: string;
  intro: string;
  servicios: string[];
  keywords: string[];
  faq: Array<{ pregunta: string; respuesta: string }>;
  relacionadas: string[];
}

// Generate static params for all category/location combinations
export async function generateStaticParams() {
  const params = [];
  for (const cat of categorias) {
    for (const ub of ubicaciones) {
      params.push({
        categoria: cat.slug,
        ubicacion: ub.slug,
      });
    }
  }
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { categoria: string; ubicacion: string };
}): Promise<Metadata> {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  const ubicacion = ubicaciones.find((u) => u.slug === params.ubicacion) as Ubicacion | undefined;

  if (!categoria || !ubicacion) {
    return {
      title: 'Página no encontrada',
    };
  }

  const title = `${categoria.nombre} en ${ubicacion.nombre} | Bambora`;
  const description = `${categoria.descripcionCorta} Producción audiovisual profesional para ${categoria.nombreCorto} en ${ubicacion.nombre}. Equipo especializado en ${ubicacion.tipo}s. Contáctanos.`;
  const url = `${SITE_URL}/${params.categoria}/${params.ubicacion}`;
  const keywords = [...categoria.keywords, ubicacion.nombre, `${categoria.nombreCorto} ${ubicacion.nombre}`].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// Page Component
export default function Page({ params }: { params: { categoria: string; ubicacion: string } }) {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  const ubicacion = ubicaciones.find((u) => u.slug === params.ubicacion) as Ubicacion | undefined;

  if (!categoria || !ubicacion) {
    return <div className="page-container">Página no encontrada</div>;
  }

  // Get related categories for internal links
  const relatedCats = categoria.relacionadas
    .map((slug) => categorias.find((c) => c.slug === slug))
    .filter((c) => c !== undefined) as Categoria[];

  // Get other locations in same category for internal links
  const otherLocations = ubicaciones
    .filter((u) => u.slug !== ubicacion.slug)
    .slice(0, 10);

  // Answer-first paragraph combining categoria and ubicacion data
  const answerFirstParagraph = `En Bambora ofrecemos ${categoria.nombreCorto} de nivel profesional en ${ubicacion.nombre}, ${ubicacion.comunidad} — ${ubicacion.descripcion}. ${categoria.intro}

${ubicacion.nombre} cuenta con infraestructura ideal para este tipo de producciones: ${ubicacion.venues}. ${ubicacion.logistica} Nuestro equipo conoce ${ubicacion.tipo === 'ciudad' ? 'la ciudad' : 'la zona'} y se adapta al entorno para maximizar el resultado audiovisual de tu evento.`;

  return (
    <>
      {/* JSON-LD Schemas */}
      <OrganizationSchema />
      <LocalBusinessSchema ubicacion={ubicacion} />
      <ServiceSchema categoria={categoria} ubicacion={ubicacion} />
      <FAQSchema faq={categoria.faq} />
      <BreadcrumbSchema categoria={categoria} ubicacion={ubicacion} />
      <HowToSchema categoria={categoria} ubicacion={ubicacion} />
      <ReviewSchema />

      <div className="page-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={SITE_URL}>Inicio</a>
          <span className="breadcrumb-sep">/</span>
          <a href={`${SITE_URL}/${categoria.slug}`}>{categoria.nombre}</a>
          <span className="breadcrumb-sep">/</span>
          <span>{`${categoria.nombre} en ${ubicacion.nombre}`}</span>
        </nav>

        {/* Hero Section */}
        <section className="page-hero">
          <div className="page-hero-label">{ubicacion.nombre}</div>
          <h1>{`${categoria.nombre} en ${ubicacion.nombre}`}</h1>
          <p className="page-hero-sub intro-text">{answerFirstParagraph}</p>
          <a href="mailto:hello@bambora.agency" className="cta-button">
            Solicita tu presupuesto
          </a>
        </section>

        {/* Services Section */}
        <section className="section">
          <h2>{`¿Qué incluye nuestro servicio de ${categoria.nombreCorto} en ${ubicacion.nombre}?`}</h2>
          <div className="services-grid">
            {categoria.servicios.map((servicio, index) => (
              <div key={index} className="service-card">
                <div className="service-num">{index + 1}</div>
                <h3 className="service-name">{servicio}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* How To Section */}
        <section className="section">
          <h2>{`¿Cómo funciona contratar ${categoria.nombreCorto} en ${ubicacion.nombre}?`}</h2>
          <div className="steps-grid">
            {[
              {
                title: 'Solicita tu presupuesto',
                description: `Contacta con Bambora para describir tu evento y necesidades de ${categoria.nombreCorto} en ${ubicacion.nombre}. Nuestro equipo evaluará tu proyecto y te proporcionará un presupuesto personalizado en 24 horas.`,
              },
              {
                title: 'Planificación y preproducción',
                description: `Coordinamos los detalles logísticos, ubicaciones de grabación, permisos necesarios y equipamiento especializado para tu evento de ${categoria.nombreCorto}. Realizamos una reunión de briefing con stakeholders principales.`,
              },
              {
                title: 'Grabación en el evento',
                description: `Nuestro equipo de profesionales se desplaza a ${ubicacion.nombre} con equipamiento de cine profesional para capturar toda la cobertura de ${categoria.nombreCorto}. Trabajamos discretamente sin interrumpir la experiencia de los asistentes.`,
              },
              {
                title: 'Edición y postproducción',
                description: `Editamos el material con estándares de cine profesional, incluyendo corrección de color, sonido envolvente y efectos visuales. Generamos múltiples formatos y versiones para tus necesidades de distribución.`,
              },
              {
                title: 'Entrega y lanzamiento',
                description: `Entregas el contenido final sin marca de agua en múltiples formatos (4K, 1080p, vertical para redes). Incluimos sesión de capacitación sobre cómo maximizar el uso del material en tus canales.`,
              },
            ].map((step, index) => (
              <div key={index} className="step">
                <div className="step-num">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <h2>{`Preguntas frecuentes sobre ${categoria.nombreCorto} en ${ubicacion.nombre}`}</h2>
          <div className="faq-list">
            {categoria.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary>{item.pregunta}</summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>¿Listo para llevar tu {categoria.nombreCorto} al siguiente nivel?</h2>
          <p>
            Contacta con nuestro equipo en {ubicacion.nombre} para una consulta gratuita sobre tu proyecto.
          </p>
          <a href="mailto:hello@bambora.agency" className="cta-button">
            Solicita presupuesto para {ubicacion.nombre}
          </a>
        </section>

        {/* Internal Links - Same Category, Other Locations */}
        <section className="section">
          <h2>{`${categoria.nombre} en otras ubicaciones`}</h2>
          <div className="internal-links">
            <div className="links-grid">
              {otherLocations.map((ub) => (
                <a
                  key={ub.slug}
                  href={`${SITE_URL}/${categoria.slug}/${ub.slug}`}
                  className="internal-link"
                >
                  {categoria.nombre} en {ub.nombre}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links - Related Categories, Same Location */}
        <section className="section">
          <h2>Otros servicios audiovisuales en {ubicacion.nombre}</h2>
          <div className="internal-links">
            <div className="links-grid">
              {relatedCats.map((relCat) => (
                <a
                  key={relCat.slug}
                  href={`${SITE_URL}/${relCat.slug}/${ubicacion.slug}`}
                  className="internal-link"
                >
                  {relCat.nombre} en {ubicacion.nombre}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}