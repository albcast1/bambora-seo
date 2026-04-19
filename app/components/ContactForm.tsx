'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [form, setForm] = useState({
    nombre:'', apellidos:'', telefono:'', email:'', empresa:'', mensaje:''
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '9f8837a9-bf23-413f-98d0-e92fdad2794f',
        subject: 'Nuevo contacto desde bambora.agency — ' + form.empresa,
        from_name: form.nombre + ' ' + form.apellidos,
        ...form,
      }),
    });
    const data = await res.json();
    setStatus(data.success ? 'ok' : 'error');
  };

  if (status === 'ok') {
    return (
      <div className="form-success">
        <p>✓ Mensaje recibido. Te contactamos en 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-row">
        <input name="nombre" type="text" placeholder="Nombre *" required value={form.nombre} onChange={handle} />
        <input name="apellidos" type="text" placeholder="Apellidos *" required value={form.apellidos} onChange={handle} />
      </div>
      <div className="form-row">
        <input name="telefono" type="tel" placeholder="Teléfono *" required value={form.telefono} onChange={handle} />
        <input name="email" type="email" placeholder="Email de empresa *" required value={form.email} onChange={handle} />
      </div>
      <input name="empresa" type="text" placeholder="Nombre de tu empresa" value={form.empresa} onChange={handle} />
      <textarea name="mensaje" placeholder="¿En qué te podemos ayudar? *" required rows={4} value={form.mensaje} onChange={handle} />
      <button type="submit" className="cta-button" disabled={status==='sending'}>
        {status === 'sending' ? 'Enviando...' : 'Hablemos de tu proyecto'}
      </button>
      {status === 'error' && <p className="form-error">Error al enviar. Escríbenos a hello@bambora.agency</p>}
    </form>
  );
}