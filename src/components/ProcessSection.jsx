import { useReveal } from '../hooks/useReveal'

export default function ProcessSection({ data }) {
  const rHeadline = useReveal()

  if (!data) return null

  // bgVideo shows an autoplaying muted video on the right instead of Loom embed
  const hasBgVideo = !!data.bgVideo

  return (
    <section
      id="process"
      className="bd-section"
      style={{ background: '#ffffff', position: 'relative' }}
    >
      <span className="bd-label">{data.label}</span>

      <div
        className="grid items-center w-full"
        style={{ gridTemplateColumns: '1fr 1.1fr', gap: 'clamp(2rem,5vw,5rem)' }}
      >
        {/* Left — headline + steps */}
        <div>
          <div ref={rHeadline} className="bd-reveal">
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(2.5rem,4.5vw,4.5rem)',
                lineHeight: 1,
                color: 'var(--ink)',
                marginBottom: 'clamp(1.8rem,3.5vw,3rem)',
                maxWidth: 480,
              }}
            >
              {data.headlinePre}<br />
              <span style={{ color: 'var(--gold)' }}>{data.headlineAccent}</span>
              {' '}{data.headlinePost}
            </h2>
          </div>

          <div className="flex flex-col">
            {data.steps.map((step, i) => (
              <Step key={i} step={step} delay={i + 1} />
            ))}
          </div>
        </div>

        {/* Right — background video OR Loom embed, both bigger */}
        <VideoOrLoom data={data} hasBgVideo={hasBgVideo} />
      </div>
    </section>
  )
}

function VideoOrLoom({ data, hasBgVideo }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="bd-reveal bd-d2">
      <div
        style={{
          position: 'relative',
          width: '100%',
          /* Taller than before — 9/16 ratio (portrait-ish) for screen recordings */
          aspectRatio: hasBgVideo ? '16/10' : '16/10',
          background: 'var(--ink)',
          overflow: 'hidden',
          boxShadow: '24px 24px 0 var(--paper-dark)',
        }}
      >
        {hasBgVideo ? (
          <>
            <video
              autoPlay muted loop playsInline
              src={data.bgVideo}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: 1,
                pointerEvents: 'none',
              }}
            />
            {/* Subtle overlay so it reads as a screen recording, not raw footage */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.45) 100%)',
              pointerEvents: 'none',
            }} />
            {/* Playing badge — bottom left of the video */}
            <div style={{
              position: 'absolute', bottom: '1rem', left: '1rem',
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              padding: '.5rem 1rem',
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
              color: 'rgba(255,255,255,.7)',
              fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--gold)', flexShrink: 0,
                animation: 'pulseDot 2s infinite',
              }} />
              Real client session
            </div>
          </>
        ) : data.loomVideoId ? (
          <iframe
            src={`https://www.loom.com/embed/${data.loomVideoId}`}
            allowFullScreen
            title="Process walkthrough"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            color: 'rgba(255,255,255,.3)',
          }}>
            <span style={{ fontSize: '3rem', opacity: .4 }}>▶</span>
            <span style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase' }}>
              Set loomVideoId or bgVideo in site.json
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function Step({ step, delay }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`bd-reveal bd-d${delay} step flex items-start`}
      style={{ gap: '1.4rem', padding: '1.4rem 0', borderTop: '1px solid var(--paper-dark)', transition: 'padding-left .2s' }}
      onMouseEnter={e => e.currentTarget.style.paddingLeft = '.5rem'}
      onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
    >
      <div
        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.8rem', lineHeight: 1, color: 'var(--paper-dark)', minWidth: 48, transition: 'color .2s' }}
        onMouseEnter={e => e.target.style.color = 'var(--teal)'}
        onMouseLeave={e => e.target.style.color = 'var(--paper-dark)'}
      >
        {step.number}
      </div>
      <div style={{ paddingTop: '.15rem' }}>
        <div style={{ fontSize: '.9rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '.25rem' }}>{step.title}</div>
        <div style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{step.desc}</div>
      </div>
    </div>
  )
}