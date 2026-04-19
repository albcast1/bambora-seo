'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('access_key', '9f8837a9-bf23-413f-98d0-e92fdad2794f');
    data.append('subject', 'Nuevo contacto desde bambora.agency');
    data.append('from_name', 'Bambora Agency Web');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-inner">
        <div className="contact-header">
          <p className="contact-label">Contacto</p>
          <h2 className="contact-title">Cuéntanos tu evento</h2>
          <p className="contact-sub">
            Respuesta en menos de 24 horas. Sin compromisos.
          </p>
        </div>
        {status === 'success' ? (
          <div className="contact-success">
            <p>✓ Mensaje enviado. Te escribimos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email de empresa"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="empresa"
                placeholder="Nombre de tu empresa"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="¿Qué tipo de evento tienes en mente? Cuéntanos."
                required
                rows={5}
                className="form-input form-textarea"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="form-submit"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {status === 'error' && (
              <p className="form-error">Algo salió mal. Escríbenos a hello@bambora.agency</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
