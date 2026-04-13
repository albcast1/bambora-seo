export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="hero-video">
          <video autoPlay muted loop playsInline>
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
          <div className="marquee-item">Fotograf\u00eda de eventos <span className="dot"></span></div>
          <div className="marquee-item">Aftermovies <span className="dot"></span></div>
          <div className="marquee-item">Contenido para RRSS <span className="dot"></span></div>
          <div className="marquee-item">Dron <span className="dot"></span></div>
          <div className="marquee-item">Motion graphics <span className="dot"></span></div>
          <div className="marquee-item">C\u00e1mara lenta <span className="dot"></span></div>
          <div className="marquee-item">Fotograf\u00eda de eventos <span className="dot"></span></div>
          <div className="marquee-item">Aftermovies <span className="dot"></span></div>
          <div className="marquee-item">Contenido para RRSS <span className="dot"></span></div>
          <div className="marquee-item">Dron <span className="dot"></span></div>
          <div className="marquee-item">Motion graphics <span className="dot"></span></div>
          <div className="marquee-item">C\u00e1mara lenta <span className="dot"></span></div>
        </div>
      </div>

      {/* WHAT */}
      <section className="what">
        <div className="what-label">Servicio en toda Espa\u00f1a</div>
        <p className="what-services">
          Fotograf\u00eda de eventos corporativos <span className="sep">\u00b7</span> Edici\u00f3n de v\u00eddeo y aftermovies <span className="sep">\u00b7</span> Contenido para Redes Sociales <span className="sep">\u00b7</span> Grabaci\u00f3n con Dron <span className="sep">\u00b7</span> Motion graphics <span className="sep">\u00b7</span> C\u00e1mara lenta
        </p>
      </section>

      {/* REEL */}
      <section className="reel" id="proyectos">
        <div className="reel-label">Proyectos destacados</div>
        <div className="reel-grid">
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline>
              <source src="/hero-reel.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline>
              <source src="https://videos.pexels.com/video-files/8710272/8710272-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reel-item">
            <div className="reel-bg"></div>
            <video autoPlay muted loop playsInline>
              <source src="https://videos.pexels.com/video-files/3255325/3255325-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto-inner">
          <p className="manifesto-text">
            <span className="dim">Tu evento ya es incre\u00edble.</span><br /> Lo <span className="pop">grabamos</span>, lo <span className="green">editamos</span> <span className="dim">y lo convertimos en contenido que</span> vende tu marca.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <a href="mailto:hello@bambora.agency" className="cta-email">hello@bambora.agency</a>
        <p className="cta-sub">Hablemos de tu pr\u00f3ximo evento</p>
      </section>
    </main>
  );
}
