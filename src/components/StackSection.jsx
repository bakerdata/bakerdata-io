import { useReveal } from '../hooks/useReveal'

export default function StackSection({ data }) {
  const rH = useReveal()
  const rG = useReveal()
  if (!data) return null

  return (
    <section id="stack" className="bd-section" style={{ background: 'var(--paper)' }}>
      <span className="bd-label">{data.label}</span>

      <div style={{ width: '100%' }}>
        <h2
          ref={rH}
          className="bd-reveal"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(2.5rem,4vw,4.5rem)',
            color: 'var(--ink)',
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
          }}
        >
          {data.headline}
        </h2>

        {/*
          Flex wrap + justify-center: items fill rows naturally and
          the last partial row is centred instead of leaving a grey grid gap.
          Each item has a fixed width so rows stay consistent.
        */}
        <div
          ref={rG}
          className="bd-reveal bd-d1"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 0,
            background: 'transparent',
          }}
        >
          {data.items.map(item => (
            <StackItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StackItem({ item }) {
  const hasIcon = !!item.deviconClass

  return (
    <div
      className="stack-item"
      style={{
        background: 'var(--paper)',
        width: 'clamp(80px, 9vw, 120px)',
        padding: '1.1rem 0.6rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '.45rem',
        border: '1px solid var(--paper-dark)',
      }}
    >
      {hasIcon ? (
        <i
          className={`${item.deviconClass} bd-devicon`}
          aria-hidden="true"
          style={{ fontSize: '1.9rem' }}
        />
      ) : (
        <div style={{
          width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--paper-dark)',
          borderRadius: 4,
          fontSize: '.65rem', fontWeight: 600,
          color: 'var(--ink-mid)',
          letterSpacing: '.04em',
        }}>
          {item.abbr || item.name.slice(0, 3).toUpperCase()}
        </div>
      )}
      <span style={{
        fontSize: '.55rem',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {item.name}
      </span>
    </div>
  )
}