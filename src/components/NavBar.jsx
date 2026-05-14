import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DARK_SECTIONS } from './Cursor'

function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()
  return (sectionId) => {
    const id = sectionId.replace('#', '')
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export default function NavBar({ nav }) {
  const [open, setOpen]     = useState(false)
  const [isDark, setIsDark] = useState(false)
  const scrollTo = useScrollTo()

  // Watch dark sections — flip logo + links colour when they're ≥50% visible
  useEffect(() => {
    const targets = DARK_SECTIONS
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        // Any dark section >50% visible → dark mode on
        const anyVisible = entries.some(e => e.isIntersecting && e.intersectionRatio > 0.5)
        // Also keep it on if we're currently sitting IN a dark section
        const currentDark = DARK_SECTIONS.some(id => {
          const el = document.getElementById(id)
          if (!el) return false
          const rect = el.getBoundingClientRect()
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
        })
        setIsDark(anyVisible || currentDark)
      },
      { threshold: [0, 0.5, 1] }
    )

    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  // Also re-check on scroll for the positional check
  useEffect(() => {
    const root = document.getElementById('root') || window
    const check = () => {
      const dark = DARK_SECTIONS.some(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5
      })
      setIsDark(dark)
    }
    root.addEventListener('scroll', check, { passive: true })
    return () => root.removeEventListener('scroll', check)
  }, [])

  if (!nav) return null

  const logoColor  = isDark ? 'var(--paper)' : 'var(--ink)'
  const linkColor  = isDark ? 'rgba(255,255,255,0.55)' : 'var(--ink-mid)'
  const linkHover  = isDark ? '#ffffff' : 'var(--teal)'

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    if (href.startsWith('#')) scrollTo(href)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{ padding: '0.8rem var(--pad)' }}
      >
        {/* Logo image — switches to inverted version on dark sections */}
        <a
          href="#hero"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          onClick={e => handleNavClick(e, '#hero')}
        >
          <img
            src="/logo.png"
            alt="BakerData.IO"
            style={{
              height: 40,
              width: 'auto',
              transition: 'filter 0.3s',
              /* On dark backgrounds, invert the logo so it reads on black */
              filter: isDark ? 'invert(1) brightness(2)' : 'none',
            }}
          />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center list-none m-0 p-0" style={{ gap: '2.5rem' }}>
          {nav.links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{ fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: linkColor, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = linkHover}
                onMouseLeave={e => e.target.style.color = linkColor}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            {/*
              NOT using bd-btn class here — that class has color: var(--paper)
              baked in at high specificity which overrides inline color.
              Going fully inline so isDark can flip text colour reliably.
            */}
            <a
              href={nav.cta.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                fontSize: '.72rem',
                fontWeight: 500,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                border: '1.5px solid',
                transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                background:   isDark ? 'var(--paper)' : 'var(--ink)',
                color:        isDark ? 'var(--ink)'   : 'var(--paper)',
                borderColor:  isDark ? 'var(--paper)' : 'var(--ink)',
              }}
              onClick={e => handleNavClick(e, nav.cta.href)}
            >
              {nav.cta.label}
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 border-none bg-transparent p-0"
          style={{ color: logoColor, fontSize: '1.4rem', transition: 'color 0.3s' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setOpen(false)} />
          <div className="fixed top-[52px] left-0 right-0 z-50 flex flex-col md:hidden" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--paper-dark)' }}>
            {nav.links.map(link => (
              <a key={link.label} href={link.href}
                style={{ padding: '1rem 1.5rem', fontSize: '.85rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-mid)', textDecoration: 'none', borderBottom: '1px solid var(--paper-dark)', display: 'block' }}
                onClick={e => handleNavClick(e, link.href)}
              >{link.label}</a>
            ))}
            <div style={{ padding: '1rem 1.5rem' }}>
              <a href={nav.cta.href} className="bd-btn" onClick={e => handleNavClick(e, nav.cta.href)}>{nav.cta.label}</a>
            </div>
          </div>
        </>
      )}
    </>
  )
}