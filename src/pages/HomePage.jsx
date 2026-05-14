import { useEffect } from 'react'
import { useSiteData } from '../hooks/useSiteData'
import HeroSection        from '../components/HeroSection'
import ProcessSection     from '../components/ProcessSection'
import TestimonialSection from '../components/TestimonialSection'
import StackSection       from '../components/StackSection'
import ClientsSection     from '../components/ClientsSection'
import CtaSection         from '../components/CtaSection'

export default function HomePage() {
  const { data, loading } = useSiteData()

  useEffect(() => {
    if (data) document.title = data.meta.title
  }, [data])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: 'var(--ink-muted)', letterSpacing: '.2em' }}>
        LOADING…
      </span>
    </div>
  )

  if (!data) return null

  return (
    <>
      <HeroSection        data={data.hero}         />
      <ProcessSection     data={data.process}      />
      <TestimonialSection data={data.testimonials} />
      <StackSection       data={data.stack}        />
      <ClientsSection     data={data.clients}      />
      <CtaSection         data={data.cta} footerText={data.footer.marqueeText} />
    </>
  )
}
