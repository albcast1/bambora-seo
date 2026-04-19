import ContactForm from './components/ContactForm';
export default function Home() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Bambora — Producción audiovisual para eventos corporativos',
        description: 'Reel de producción audiovisual de Bambora: aftermovies, fotografía corporativa, grabación con dron y contenido para eventos de empresa en España.',
        thumbnailUrl: 'https://www.bambora.agency/hero-poster.jpg',
        uploadDate: '2024-01-01',
        contentUrl: 'https://www.bambora.agency/hero-reel.mp4.mp4',
        embedUrl: 'https://www.bambora.agency/',
        publisher: {
          '@type': 'Organization',
          name: 'Bambora',
          url: 'https://www.bambora.agency',
        },
      }) }}
    />
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="hero-video">
          <video autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg">
            <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">BAM<span className="stroke">BO</span><br />RA</h1>
          <div className="hero-bottom">
            <p className="hero-tag">
              Producción audiovisual que convierte tu evento en <em>marca</em>.
            </p>
            <span className="hero-scroll">Scroll ↓</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <div className="marquee-item">Fotografía de eventos <span className="dot"></span></div>
          <div className="marquee-item">Aftermovies <span className="dot"></span></div>
          <div className="marquee-item">Contenido para RRSS <span className="dot"></span></div>
          <div className="marquee-item">Dron <span className="dot"></span></div>
          <div className="marquee-item">Motion graphics <span className="dot"></span></div>
          <div className="marquee-item">Cámara lenta <span className="dot"></span></div>
          <div className="marquee-item">Fotografía de eventos <span className="dot"></span></div>
          <div className="marquee-item">Aftermovies <span className="dot"></span></div>
          <div className="marquee-item">Contenido para RRSS <span className="dot"></span></div>
          <div className="marquee-item">Dron <span className="dot"></span></div>
          <div className="marquee-item">Motion graphics <span className="dot"></span></div>
          <div className="marquee-item">Cámara lenta <span className="dot"></span></div>
        </div>
      </div>

      {/* WHAT */}
      <section className="what">
        <div className="what-label">Servicio en toda España</div>
        <p className="what-services">
          Fotografía de eventos corporativos <span className="sep">·</span> Edición de vídeo y aftermovies <span className="sep">·</span> Contenido para Redes Sociales <span className="sep">·</span> Grabación con Dron <span className="sep">·</span> Motion graphics <span className="sep">·</span> Cámara lenta
        </p>
      </section>

      {/* REEL */}
      <section className="reel" id="proyectos">
        <div className="reel-label">Proyectos destacados</div>
        <div className="reel-grid">
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/hero-reel.mp4.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="https://videos.pexels.com/video-files/8710272/8710272-hd_1280_720_30fps.mp4" type="video/mp4" />
              <source src="https://videos.pexels.com/video-files/8710272/8710272-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="https://videos.pexels.com/video-files/3255325/3255325-hd_1280_720_25fps.mp4" type="video/mp4" />
              <source src="https://videos.pexels.com/video-files/3255325/3255325-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto-inner">
          <p className="manifesto-text">
            <span className="dim">Tu evento ya es increíble.</span><br /> Lo <span className="pop">grabamos</span>, lo <span className="green">editamos</span> <span className="dim">y lo convertimos en contenido que</span> vende tu marca.
          </p>
        </div>
      </section>

      {/* POR QUE BAMBORA */}
      <section className="why-section">
        <div className="why-label">Por qué Bambora</div>
        <div className="why-grid">
          <div className="why-item">
            <span className="why-num">01</span>
            <h3>Equipo desplazado a tu evento</h3>
            <p>Nos movemos a donde sea. Madrid, Barcelona, Málaga, Sevilla o donde necesites. Sin costes ocultos de desplazamiento para eventos en las principales ciudades.</p>
          </div>
          <div className="why-item">
            <span className="why-num">02</span>
            <h3>Entrega rápida</h3>
            <p>Aftermovie en 72 horas para eventos urgentes. Fotografía el mismo día. Contenido listo antes de que tu equipo vuelva de vuelta a la oficina.</p>
          </div>
          <div className="why-item">
            <span className="why-num">03</span>
            <h3>Una productora, todos los formatos</h3>
            <p>Vídeo, fotografía, dron, streaming y contenido para redes. Un solo proveedor para todo el evento. Sin coordinaciones entre terceros.</p>
          </div>
          <div className="why-item">
            <span className="why-num">04</span>
            <h3>Enfoque en marca</h3>
            <p>No grabamos eventos. Creamos activos de comunicación. Cada pieza está pensada para LinkedIn, para tu intranet, para el siguiente dosier comercial.</p>
          </div>
        </div>
      </section>

      {/* TIPOS DE EVENTOS */}
      <section className="types-section">
        <div className="types-label">Para qué tipo de eventos</div>
        <p className="types-intro">
          Cubrimos desde offsites íntimos de 10 personas hasta convenciones de 500 asistentes.
          Si tiene cámara delante, lo hacemos bien.
        </p>
        <div className="types-list">
          {[
            'Offsites y retiros de equipo','Convenciones y kickoffs','Team building','Cenas y fiestas de empresa',
            'Ferias y congresos','Vídeos de employer branding','Testimoniales de cliente','Streaming corporativo'
          ].map((t,i)=>(
            <span key={i} className="type-tag">{t}</span>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactForm />
    </main>
    </>
  );
}
