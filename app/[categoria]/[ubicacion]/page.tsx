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

export async function generateMetadata({
  params,
}: {
  params: { categoria: string; ubicacion: string };
}): Promise<Metadata> {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  const ubicacion = ubicaciones.find((u) => u.slug === params.ubicacion) as Ubicacion | undefined;

  if (!categoria || !ubicacion) {
    return { title: 'P\u00e1gina no encontrada' };
  }

  const title = `${categoria.nombre} en ${ubicacion.nombre} | Bambora`;
  const description = `${categoria.descripcionCorta} Producci\u00f3n audiovisual profesional para ${categoria.nombreCorto} en ${ubicacion.nombre}. Equipo especializado en ${ubicacion.tipo}s. Cont\u00e1ctanos.`;
  const url = `${SITE_URL}/${params.categoria}/${params.ubicacion}`;
  const keywords = [...categoria.keywords, ubicacion.nombre, `${categoria.nombreCorto} ${ubicacion.nombre}`].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    // Noindex: 20×40=800 páginas cuasi-idénticas son doorway pages (Google penaliza).
    // Las mantenemos accesibles (SEM, enlaces directos) pero fuera del índice orgánico.
    // El valor SEO se concentra en los 20 hubs /[categoria]/ indexables.
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default function Page({ params }: { params: { categoria: string; ubicacion: string } }) {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  const ubicacion = ubicaciones.find((u) => u.slug === params.ubicacion) as Ubicacion | undefined;

  if (!categoria || !ubicacion) {
    return <div className="page-container">Página no encontrada</div>;
  }

  const relatedCats = categoria.relacionadas
    .map((slug) => categorias.find((c) => c.slug === slug))
    .filter((c) => c !== undefined) as Categoria[];

  const otherLocations = ubicaciones
    .filter((u) => u.slug !== ubicacion.slug)
    .slice(0, 10);

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema ubicacion={ubicacion} />
      <ServiceSchema categoria={categoria} ubicacion={ubicacion} />
      <FAQSchema faq={categoria.faq} />
      <BreadcrumbSchema categoria={categoria} ubicacion={ubicacion} />
      <HowToSchema categoria={categoria} ubicacion={ubicacion} />
      <ReviewSchema />

      <div className="page-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ mixBlendMode: 'normal', position: 'static', padding: 0 }}>
          <a href="/">Inicio</a>
          <span className="breadcrumb-sep">/</span>
          <a href={`/${categoria.slug}/`}>{categoria.nombre}</a>
          <span className="breadcrumb-sep">/</span>
          <span>{ubicacion.nombre}</span>
        </nav>

        {/* Hero */}
        <section className="page-hero">
          <div className="page-hero-video">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4" type="video/mp4" />
              <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="page-hero-content">
            <div className="page-hero-label">{ubicacion.nombre}</div>
            <h1>{categoria.nombre} en {ubicacion.nombre}</h1>
            <p className="page-hero-sub">{categoria.descripcionCorta}</p>
            <a href="mailto:hello@bambora.agency" className="cta-button">
              Solicita tu presupuesto
            </a>
          </div>
        </section>

        {/* Contexto ubicación */}
        <section className="section">
          <p className="intro-text">
            <strong style={{ color: 'var(--white)', fontStyle: 'normal', fontFamily: 'Syne, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>{ubicacion.nombre}, {ubicacion.comunidad}</strong>
            <br />
            {ubicacion.descripcion} {ubicacion.logistica}
          </p>
        </section>

        {/* Services */}
        <section className="section">
          <h2>¿Qué incluye nuestro servicio de {categoria.nombreCorto} en {ubicacion.nombre}?</h2>
          <div className="services-grid">
            {categoria.servicios.map((servicio, index) => (
              <div key={index} className="service-card">
                <div className="service-num">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="service-name">{servicio}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* How To */}
        <section className="section">
          <h2>¿Cómo funciona contratar {categoria.nombreCorto} en {ubicacion.nombre}?</h2>
          <div className="steps-grid">
            {[
              {
                title: 'Solicita tu presupuesto',
                description: `Contacta con Bambora para describir tu evento y necesidades de ${categoria.nombreCorto} en ${ubicacion.nombre}. Nuestro equipo evaluar\u00e1 tu proyecto y te proporcionar\u00e1 un presupuesto personalizado en 24 horas.`,
              },
              {
                title: 'Planificaci\u00f3n y preproducci\u00f3n',
                description: `Coordinamos los detalles log\u00edsticos, ubicaciones de grabaci\u00f3n, permisos necesarios y equipamiento especializado para tu evento de ${categoria.nombreCorto}. Realizamos una reuni\u00f3n de briefing con stakeholders principales.`,
              },
              {
                title: 'Grabaci\u00f3n en el evento',
                description: `Nuestro equipo de profesionales se desplaza a ${ubicacion.nombre} con equipamiento de cine profesional para capturar toda la cobertura de ${categoria.nombreCorto}. Trabajamos discretamente sin interrumpir la experiencia de los asistentes.`,
              },
              {
                title: 'Edici\u00f3n y postproducci\u00f3n',
                description: `Editamos el material con est\u00e1ndares de cine profesional, incluyendo correcci\u00f3n de color, sonido envolvente y efectos visuales. Generamos m\u00faltiples formatos y versiones para tus necesidades de distribuci\u00f3n.`,
              },
              {
                title: 'Entrega y lanzamiento',
                description: `Entregas el contenido final sin marca de agua en m\u00faltiples formatos (4K, 1080p, vertical para redes). Incluimos sesi\u00f3n de capacitaci\u00f3n sobre c\u00f3mo maximizar el uso del material en tus canales.`,
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


        {/* FAQ */}
        <section className="section">
          <h2>Preguntas frecuentes sobre {categoria.nombreCorto} en {ubicacion.nombre}</h2>
          <div className="faq-list">
            {categoria.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary>{item.pregunta}</summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>¿Listo para llevar tu {categoria.nombreCorto} al siguiente nivel?</h2>
          <p>
            Contacta con nuestro equipo en {ubicacion.nombre} para una consulta gratuita sobre tu proyecto.
          </p>
          <a href="mailto:hello@bambora.agency" className="cta-button">
            Solicita presupuesto para {ubicacion.nombre}
          </a>
        </section>

        {/* Internal Links - Other Locations */}
        <section className="section">
          <h2>{categoria.nombre} en otras ubicaciones</h2>
          <div className="internal-links">
            <div className="links-grid">
              {otherLocations.map((ub) => (
                <a key={ub.slug} href={`/${categoria.slug}/${ub.slug}/`} className="internal-link">
                  {categoria.nombre} en {ub.nombre}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links - Related Categories */}
        <section className="section">
          <h2>Otros servicios audiovisuales en {ubicacion.nombre}</h2>
          <div className="internal-links">
            <div className="links-grid">
              {relatedCats.map((relCat) => (
                <a key={relCat.slug} href={`/${relCat.slug}/${ubicacion.slug}/`} className="internal-link">
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
