import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function HeroSection({ data }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal()

  if (!data) return null

  const scrollToContact = e => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="bd-section"
      style={{ background: 'var(--paper)', justifyContent: 'center', paddingTop: 'calc(var(--pad) * 2)' }}
    >
      <span className="bd-label">{data.label}</span>

      <div
        className="grid items-end w-full"
        style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(2rem, 5vw, 5rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left — text */}
        <div className="flex flex-col justify-end">
          <div ref={r1} className="bd-reveal">
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.8rem, 8vw, 8.5rem)',
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                color: 'var(--ink)',
                marginBottom: '1.8rem',
              }}
            >
              {data.headlinePre}<br />
              <span style={{ color: 'var(--teal)' }}>{data.headlineAccent}</span><br />
              {data.headlinePost.map((line, i) => (
                <span key={i}>{line}{i < data.headlinePost.length - 1 && <br />}</span>
              ))}
            </p>
          </div>

          <p
            ref={r2}
            className="bd-reveal bd-d2"
            style={{
              fontSize: 'clamp(.95rem, 1.6vw, 1.2rem)',
              fontWeight: 300,
              color: 'var(--ink-mid)',
              maxWidth: 400,
              lineHeight: 1.55,
              marginBottom: '2.5rem',
            }}
          >
            {data.subheading}
          </p>

          <div ref={r3} className="bd-reveal bd-d3">
            <a href="#contact" className="bd-btn" onClick={scrollToContact}>
              {data.cta.label}
            </a>
          </div>
        </div>

        {/* Right — headshot */}
        <div
          ref={r4}
          className="bd-reveal bd-d2 flex-col items-start justify-end hidden md:flex"
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              maxHeight: '72vh',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 88%)',
            }}
          >
            {/* Gold accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: 3, height: '60%', zIndex: 2,
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
            }} />

            {/* Actual headshot */}
            {!imgError && (
              <img
                src={data.headshot}
                alt={data.headshotAlt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  display: imgLoaded ? 'block' : 'none',
                  filter: 'grayscale(15%)',
                  transition: 'filter .4s',
                }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                onMouseEnter={e => e.target.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.target.style.filter = 'grayscale(15%)'}
              />
            )}

            {/* Placeholder */}
            {(!imgLoaded || imgError) && (
              <div
                style={{
                  width: '100%', height: '100%',
                  background: 'var(--paper-dark)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '.8rem', color: 'var(--ink-muted)',
                }}
              >
                <span style={{ fontSize: '4rem', opacity: .2 }}>👤</span>
                <span style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', opacity: .4 }}>
                  Add headshot.jpg to /public/
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: '1rem',
              fontSize: '.62rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              display: 'flex', alignItems: 'center', gap: '.6rem',
            }}
          >
            <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--gold)' }} />
            {data.headshotCaption}
          </div>
        </div>
      </div>
    </section>
  )
}
