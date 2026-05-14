import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useSiteData } from '../hooks/useSiteData'

export default function ContactPage() {
  const { data } = useSiteData()
  const [params]  = useSearchParams()
  const pathKey   = params.get('path') || 'technical'

  const [form, setForm]     = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const contact  = data?.contact
  const pathInfo = contact?.paths?.[pathKey]

  // Update page title
  useEffect(() => {
    if (data) document.title = `Get In Touch — ${data.meta.title}`
  }, [data])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!contact?.formspreeId) {
      // No Formspree ID set — show a helpful message
      setStatus('no-formspree')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...form, path: pathKey }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,.15)',
    color: 'var(--paper)',
    fontFamily: "'DM Sans',sans-serif",
    fontSize: '1rem',
    fontWeight: 300,
    padding: '.75rem 0',
    outline: 'none',
    transition: 'border-color .2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', color: 'var(--paper)', fontFamily: "'DM Sans',sans-serif" }}>

      {/* Back link */}
      <div style={{ padding: '2rem var(--pad)' }}>
        <Link
          to="/"
          style={{
            fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.35)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            transition: 'color .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}
        >
          ← Back to BakerData.IO
        </Link>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem var(--pad) 6rem' }}>

        {/* Path badge */}
        {pathInfo && (
          <div style={{
            display: 'inline-block',
            fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--gold)', border: '1px solid rgba(245,194,107,.3)',
            padding: '4px 12px', marginBottom: '2rem',
          }}>
            {pathInfo.label} — {pathInfo.description}
          </div>
        )}

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(3rem,8vw,6rem)',
          lineHeight: .95, color: 'var(--paper)',
          marginBottom: '3rem',
        }}>
          {contact?.headline || "Let's talk."}
        </h1>

        <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, marginBottom: '3rem' }}>
          {contact?.subheading}
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: 'var(--gold)', marginBottom: '.5rem' }}>
              Message sent!
            </p>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', fontWeight: 300 }}>
              I'll be in touch within 24 hours.
            </p>
          </div>
        ) : status === 'no-formspree' ? (
          <div style={{ border: '1px solid rgba(245,194,107,.3)', padding: '1.5rem', color: 'rgba(255,255,255,.6)', fontSize: '.85rem', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '.5rem' }}>Formspree not configured</strong>
            Set your <code style={{ color: 'var(--teal)' }}>formspreeId</code> in <code style={{ color: 'var(--teal)' }}>public/site.json</code> to enable form submissions.
            Sign up free at <a href="https://formspree.io" style={{ color: 'var(--gold)' }} target="_blank" rel="noreferrer">formspree.io</a>.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="path" value={pathKey} />

            {[
              { name: 'name',    label: 'Your name',    type: 'text',  required: true  },
              { name: 'email',   label: 'Email address', type: 'email', required: true  },
              { name: 'company', label: 'Company / startup', type: 'text', required: false },
            ].map(field => (
              <div key={field.name} style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '.5rem' }}>
                  {field.label}{field.required && ' *'}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,.15)'}
                />
              </div>
            ))}

            <div style={{ marginBottom: '3rem' }}>
              <label style={{ display: 'block', fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '.5rem' }}>
                Tell me about your startup *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,.15)'}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bd-btn"
              style={{ opacity: status === 'sending' ? .6 : 1 }}
            >
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>

            {status === 'error' && (
              <p style={{ marginTop: '1rem', fontSize: '.8rem', color: '#f87171' }}>
                Something went wrong. Please try again or email hello@bakerdata.io directly.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
