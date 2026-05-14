import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function TestimonialSection({ data }) {
  const [active, setActive] = useState(0)
  const timerRef = useReveal()
  const rMark  = useReveal()
  const rSlide = useReveal()
  const rDots  = useReveal()

  const items      = data?.items || []
  const autoplayMs = data?.autoplayMs || 5000

  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => setActive(a => (a + 1) % items.length), autoplayMs)
    return () => clearInterval(t)
  }, [items.length, autoplayMs])

  if (!data) return null

  return (
    <section
      id="testimonial"
      className="bd-section"
      style={{ background: 'var(--ink)', color: 'var(--paper)', justifyContent: 'center' }}
    >
      <span className="bd-label" style={{ color: 'rgba(255,255,255,.25)' }}>{data.label}</span>

      <div style={{ maxWidth: 860 }}>
        {/* Opening quote mark */}
        <span
          ref={rMark}
          className="bd-reveal"
          aria-hidden="true"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '7rem',
            lineHeight: .7,
            color: 'var(--gold)',
            display: 'block',
            marginBottom: '1.2rem',
            userSelect: 'none',
          }}
        >"</span>

        {/* Slide area */}
        <div
          ref={rSlide}
          className="bd-reveal bd-d1"
          style={{ position: 'relative', minHeight: '13rem' }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity .55s ease, transform .55s ease',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <blockquote
                style={{
                  fontSize: 'clamp(1.35rem,2.8vw,2.2rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  color: 'var(--paper)',
                  marginBottom: '2rem',
                }}
              >
                {item.quote}
              </blockquote>
              <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>
                {item.name}, {item.role} —{' '}
                <a
                  href={item.url}
                  style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(245,194,107,.25)' }}
                  onMouseEnter={e => e.target.style.borderBottomColor = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.borderBottomColor = 'rgba(245,194,107,.25)'}
                >
                  {item.company}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        {items.length > 1 && (
          <div
            ref={rDots}
            className="bd-reveal bd-d2"
            style={{ display: 'flex', gap: '.6rem', marginTop: '2.5rem' }}
            role="tablist"
            aria-label="Testimonials"
          >
            {items.map((_, i) => (
              <button
                key={i}
                className="quote-dot"
                role="tab"
                aria-label={`Testimonial ${i + 1}`}
                aria-selected={i === active}
                onClick={() => setActive(i)}
                style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  background: i === active ? 'var(--gold)' : 'rgba(255,255,255,.2)',
                  transform: i === active ? 'scale(1.3)' : 'scale(1)',
                  transition: 'background .3s, transform .3s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
