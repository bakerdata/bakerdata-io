import { useReveal } from '../hooks/useReveal'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function ClientsSection({ data }) {
  const rH = useReveal()
  if (!data) return null

  const items_raw = data.items || []
  const count    = items_raw.length
  if (count === 0) return null

  const repeatBy = count < 5 ? 4 : count < 8 ? 3 : 2
  const items    = Array.from({ length: repeatBy }, () => items_raw).flat()

  return (
    <section id="clients" className="bd-section" style={{ background: 'var(--paper-warm)', overflow: 'hidden' }}>
      <span className="bd-label">{data.label}</span>
      <h2
        ref={rH}
        className="bd-reveal"
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.5rem,4vw,4.5rem)',
          color: 'var(--ink)',
          marginBottom: 'clamp(2rem,4vw,3.5rem)',
        }}
      >
        {data.headline}
      </h2>

      <div
        style={{
          width: 'calc(100% + var(--pad) * 2)',
          marginLeft: 'calc(-1 * var(--pad))',
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          borderTop: '1px solid var(--paper-dark)',
          borderBottom: '1px solid var(--paper-dark)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            // Slow enough that a 4-item list doesn't visibly loop
            animation: `scrollLeft ${count < 5 ? 55 : 40}s linear infinite`,
          }}
        >
          {items.map((client, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '1.8rem',
                // Generous padding — each item takes a large slice of viewport
                padding: '2rem clamp(3rem, 6vw, 7rem)',
                borderRight: '1px solid var(--paper-dark)',
                whiteSpace: 'nowrap',
              }}
            >
              {/* Logo — bigger square, always full colour */}
              {client.logoSrc ? (
                <div style={{
                  width: 60, height: 60, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img
                    src={client.logoSrc}
                    alt={client.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <div style={{
                  width: 60, height: 60, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--paper-dark)',
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '1.2rem', letterSpacing: '.05em',
                  color: 'var(--ink-mid)',
                }}>
                  {initials(client.name)}
                </div>
              )}

              {/* Name — bigger, always ink */}
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                letterSpacing: '.06em',
                color: 'var(--ink)',
              }}>
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}