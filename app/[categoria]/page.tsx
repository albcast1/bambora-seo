import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import categorias from '@/data/categorias.json';
import ubicaciones from '@/data/ubicaciones.json';
import {
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
} from '@/lib/schemas';

const SITE_URL = 'https://www.bambora.agency';

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
  portada?: { url: string; alt: string; w: number; h: number };
}

interface Ubicacion {
  slug: string;
  nombre: string;
  tipo: string;
  comunidad: string;
  descripcion: string;
  venues: string;
  logistica: string;
}

export async function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { categoria: string };
}): Promise<Metadata> {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  if (!categoria) return { title: 'Página no encontrada' };

  const title = `${categoria.nombre} | Producción audiovisual profesional | Bambora`;
  const description = `${categoria.descripcionCorta} Cobertura en toda España con equipo especializado.`;
  const url = `${SITE_URL}/${params.categoria}`;

  return {
    title,
    description,
    keywords: categoria.keywords.join(', '),
    alternates: { canonical: url },
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

export default function CategoriaHubPage({ params }: { params: { categoria: string } }) {
  const categoria = categorias.find((c) => c.slug === params.categoria) as Categoria | undefined;
  if (!categoria) return <div className="page-container">Página no encontrada</div>;

  const primeraUbicacion = ubicaciones[0] as Ubicacion;
  const relatedCats = categoria.relacionadas
    .map((slug) => categorias.find((c) => c.slug === slug))
    .filter(Boolean) as Categoria[];

  return (
    <>
      <ServiceSchema categoria={categoria} ubicacion={primeraUbicacion} />
      <FAQSchema faq={categoria.faq} />
    <BreadcrumbSchema categoria={categoria} ubicacion={primeraUbicacion} />

      <div className="page-container">
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ mixBlendMode: 'normal', position: 'static', padding: 0 }}>
          <a href="/">Inicio</a>
          <span className="breadcrumb-sep">/</span>
          <span>{categoria.nombre}</span>
        </nav>

        {/* Hero */}
        <section className="page-hero">
          {categoria.portada && (
            <img
              src={categoria.portada.url}
              alt={categoria.portada.alt}
              width={categoria.portada.w}
              height={categoria.portada.h}
              loading="eager"
              fetchPriority="high"
              style={{ width:'100%', height:'320px', objectFit:'cover', borderRadius:'12px', marginBottom:'2rem', display:'block' }}
            />
          )}
          <div className="page-hero-content">
            <div className="page-hero-label">{categoria.nombre}</div>
            <h1>{categoria.titulo}</h1>
            <p className="page-hero-sub">{categoria.descripcionCorta}</p>
            <a href="mailto:hello@bambora.agency" className="cta-button">
              Solicita tu presupuesto
            </a>
          </div>
        </section>

        {/* Intro */}
        <section className="section">
          <p className="intro-text">{categoria.intro}</p>
        </section>

        {/* Services */}
        <section className="section">
          <h2>¿Qué incluye nuestro servicio de {categoria.nombreCorto}?</h2>
          <div className="services-grid">
            {categoria.servicios.map((servicio, index) => (
              <div key={index} className="service-card">
                <div className="service-num">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="service-name">{servicio}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Ubicaciones */}
        <section className="section">
          <h2>Cobertura en toda España</h2>
          <p>
            Ofrecemos servicios de {categoria.nombreCorto} en las principales ciudades y destinos
            corporativos del país. Haz clic en tu ubicación para ver detalles específicos.
          </p>
          <div className="services-grid">
            {ubicaciones.map((ub) => (
              <Link
                key={ub.slug}
                href={`/${categoria.slug}/${ub.slug}`}
                className="service-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 className="service-name">{ub.nombre}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <h2>Preguntas frecuentes sobre {categoria.nombreCorto}</h2>
          <div className="faq-list">
            {categoria.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary>{item.pregunta}</summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Relacionadas */}
        {relatedCats.length > 0 && (
          <section className="section">
            <h2>Servicios relacionados</h2>
            <div className="services-grid">
              {relatedCats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="service-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h3 className="service-name">{c.nombre}</h3>
                  <p>{c.descripcionCorta}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="cta-section">
          <h2>¿Listo para tu próximo proyecto de {categoria.nombreCorto}?</h2>
          <p>Contacta con Bambora para una consulta gratuita sin compromiso.</p>
          <a href="mailto:hello@bambora.agency" className="cta-button">
            hello@bambora.agency
          </a>
        </section>
      </div>
    </>
  );
}
