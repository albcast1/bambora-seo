import { categorias, ubicaciones } from '@/data';

export default function Home() {
  return (
    <main className="page-container">
      <section className="page-hero">
        <h1 style={{ fontSize: 'clamp(3rem, 12vw, 6rem)', lineHeight: 1, fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          <span style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>BAM</span>
          <span style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>BO</span>
          RA
        </h1>
        <div className="page-hero-label">Producción Audiovisual</div>
        <div className="page-hero-sub">Producción audiovisual que convierte tu evento en marca.</div>
        <a href="mailto:hello@bambora.agency" className="cta-button">Cuéntanos tu proyecto</a>
      </section>

      <section id="proyectos" className="section">
        <h2>Servicios por ubicación</h2>
        <div className="services-grid">
          {categorias.map((categoria) => (
            <div key={categoria.slug} className="service-card">
              <h3 className="service-name">{categoria.nombre}</h3>
              <p>{categoria.descripcionCorta}</p>
              <details style={{ marginTop: '1.5rem' }}>
                <summary style={{ cursor: 'pointer', color: 'var(--accent)' }}>Ver ubicaciones</summary>
                <div className="links-grid" style={{ marginTop: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  {ubicaciones.map((ubicacion) => (
                    <a key={ubicacion.slug} href={`/${categoria.slug}/${ubicacion.slug}/`} className="internal-link" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                      {ubicacion.nombre}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>¿Tienes un evento próximo?</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--dim)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Contáctanos para conocer cómo podemos transformar tu evento corporativo en una experiencia audiovisual memorable.
        </p>
        <a href="mailto:hello@bambora.agency" className="cta-button">hello@bambora.agency</a>
      </section>
    </main>
  );
}