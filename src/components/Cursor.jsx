import { useEffect, useRef } from 'react'

// Sections with dark backgrounds — cursor and nav logo flip to light
export const DARK_SECTIONS = ['testimonial', 'contact']

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = e => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    const onOver = e => {
      const isHover = !!e.target.closest(
        'a, button, .step, .stack-item, .carousel-item, .cta-path, .quote-dot'
      )
      el.classList.toggle('hover', isHover)

      // Dark bg detection — check which section the hovered element is in
      const section = e.target.closest('section')
      const isDark  = section ? DARK_SECTIONS.includes(section.id) : false
      el.classList.toggle('dark-bg', isDark)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div ref={ref} className="bd-cursor" />
}
