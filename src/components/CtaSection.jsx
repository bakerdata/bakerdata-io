import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const SOCIAL_ICONS = {
  linkedin:  { svg: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
  email:     { svg: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z' },
  instagram: { svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
}

export default function CtaSection({ data, footerText }) {
  const rH      = useReveal()
  const rSub    = useReveal()
  const rPath   = useReveal()
  const rSocial = useReveal()

  if (!data) return null

  const marqueeItems = Array.from({ length: 14 }, (_, i) => i)
  const social       = data.social || []

  return (
    <section
      id="contact"
      className="bd-section"
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        justifyContent: 'space-between',
        paddingBottom: 0,
        height: '100svh',
      }}
    >
      <span className="bd-label" style={{ color: 'rgba(255,255,255,.25)' }}>{data.label}</span>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 'clamp(1rem, 2vw, 2rem)', overflow: 'hidden' }}>
        <h2
          ref={rH}
          className="bd-reveal"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(2.8rem,6vw,6.5rem)',
            lineHeight: .92,
            color: 'var(--paper)',
            marginBottom: '1rem',
            maxWidth: 900,
          }}
        >
          {data.headline}{' '}
          <span style={{ color: 'var(--gold)' }}>{data.headlineAccent}</span>
        </h2>

        <p
          ref={rSub}
          className="bd-reveal bd-d1"
          style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(255,255,255,.45)', maxWidth: 420, lineHeight: 1.6, marginBottom: '1rem' }}
        >
          {data.subheading}
        </p>

        {/* Two-path cards */}
        <div
          ref={rPath}
          className="bd-reveal bd-d2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 1,
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.08)',
            maxWidth: 800,
            marginBottom: '1.5rem',
          }}
        >
          {data.paths.map((path, i) => (
            <PathCard key={i} path={path} />
          ))}
        </div>

        {/* Social links */}
        {social.length > 0 && (
          <div
            ref={rSocial}
            className="bd-reveal bd-d3"
            style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}
          >
            {social.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                title={link.label}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  padding: '8px 16px',
                  border: '1px solid rgba(255,255,255,.15)',
                  color: 'rgba(255,255,255,.55)',
                  textDecoration: 'none',
                  fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase',
                  transition: 'border-color .2s, color .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'rgba(255,255,255,.55)' }}
              >
                {SOCIAL_ICONS[link.icon] && (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d={SOCIAL_ICONS[link.icon].svg} />
                  </svg>
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Marquee */}
      <div
        aria-hidden="true"
        style={{
          width: 'calc(100% + var(--pad) * 2)',
          marginLeft: 'calc(-1 * var(--pad))',
          borderTop: '1px solid rgba(255,255,255,.08)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeScroll 36s linear infinite' }}>
          {marqueeItems.map(i => (
            <span
              key={i}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(5rem,10vw,9.5rem)',
                lineHeight: 1, padding: '.05em .35em',
                color: 'rgba(255,255,255,.08)',
                whiteSpace: 'nowrap',
                borderRight: '1px solid rgba(255,255,255,.06)',
                display: 'inline-flex', alignItems: 'center', gap: '.3em',
              }}
            >
              {footerText || 'BAKERDATA.IO'}
              <span style={{ display: 'inline-block', width: '.2em', height: '.2em', borderRadius: '50%', background: 'var(--gold)', opacity: .4, verticalAlign: 'middle', marginBottom: '.06em', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function PathCard({ path }) {
  return (
    <Link
      to={path.href}
      className="cta-path"
      style={{
        background: 'rgba(255,255,255,.03)',
        padding: 'clamp(1.2rem,2.5vw,2rem)',
        display: 'flex', flexDirection: 'column', gap: '.8rem',
        textDecoration: 'none',
        transition: 'background .25s',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,.07)'
        e.currentTarget.querySelector('.path-bar').style.transform = 'scaleX(1)'
        e.currentTarget.querySelector('.path-arrow').style.color = 'var(--gold)'
        e.currentTarget.querySelector('.path-arrow').style.transform = 'translate(3px,-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,.03)'
        e.currentTarget.querySelector('.path-bar').style.transform = 'scaleX(0)'
        e.currentTarget.querySelector('.path-arrow').style.color = 'rgba(255,255,255,.2)'
        e.currentTarget.querySelector('.path-arrow').style.transform = 'translate(0,0)'
      }}
    >
      <div className="path-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .3s ease' }} />
      <span style={{ fontSize: '.55rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 400 }}>
        {path.label}
      </span>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.2rem,2vw,1.7rem)', color: 'var(--paper)', lineHeight: 1.05 }}>
        {path.title}
      </div>
      <div style={{ fontSize: '.75rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.6, flex: 1 }}>
        {path.desc}
      </div>
      <span className="path-arrow" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,.2)', transition: 'color .2s, transform .2s', alignSelf: 'flex-end' }}>↗</span>
    </Link>
  )
}