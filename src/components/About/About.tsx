import { useEffect, useRef, useState } from 'react'
import { translations, type Locale } from '../../i18n'


interface AboutProps {
  lang: Locale
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang].about
  const isRTL = lang === 'ar'
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        position: 'relative',
        padding: '100px 0 110px',
        background: 'linear-gradient(to bottom, #BFE0FF, #EAF4FF, #FFFFFF)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background glow ── */}
      <div style={{
        position: 'absolute', pointerEvents: 'none',
        top: '0%', left: '-180px',
        width: 440, height: 440, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,102,255,.07) 0%,transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', pointerEvents: 'none',
        bottom: '0%', right: '-120px',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,102,255,.05) 0%,transparent 70%)',
      }} />

      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(to right,transparent,rgba(0,102,255,.18),transparent)',
      }} />

      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 72,
          alignItems: 'center',
        }}>

          {/* Left col — section label + title + cta */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .55s ease 0ms, transform .55s ease 0ms',
          }}>
            {/* Label pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 999,
              background: 'rgba(0,102,255,.08)',
              border: '1px solid rgba(0,102,255,.22)',
              marginBottom: 22,
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#0066FF', boxShadow: '0 0 7px rgba(0,102,255,1)',
              }} />
              <span style={{ color: '#60A5FA', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em' }}>
                {t.label}
              </span>
            </div>

            {/* Title */}
        {/* TITLE */}
<h2
  style={{
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(2rem, 3vw, 3rem)', // avant 42→72 (kbira barcha)
    fontWeight: 600, // normal au lieu de semi-bold lourd
    lineHeight: 1.3,
    letterSpacing: '-0.015em', // moins serré
    color: '#1E293B',
    marginBottom: 24,
    maxWidth: '620px',
  }}
>
  {t.title}
</h2>
            {/* Divider accent */}
            <div style={{
              width: 48, height: 2,
              background: 'linear-gradient(to right,#0066FF,transparent)',
              marginBottom: 28,
              marginLeft: isRTL ? 'auto' : 0,
              marginRight: isRTL ? 0 : 'auto',
            }} />

            {/* CTA link */}
            <a
              href="#services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: '#0066FF', fontSize: '0.85rem', fontWeight: 600,
                letterSpacing: '0.03em', textDecoration: 'none',
                transition: 'gap .2s, color .2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '14px'; el.style.color = '#60A5FA' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '8px';  el.style.color = '#0066FF' }}
            >
              {t.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right col — description + mission + value tags */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .55s ease 160ms, transform .55s ease 160ms',
          }}>
            {/* Main description */}
            <p style={{
              color: '#334155'
            , fontSize: '1rem',
              lineHeight: 1.85, marginBottom: 24,
            }}>
              {t.description}
            </p>

            {/* Mission quote block */}
            <div style={{
              borderLeft:  isRTL ? 'none' : '2px solid rgba(0,102,255,.5)',
              borderRight: isRTL ? '2px solid rgba(0,102,255,.5)' : 'none',
              paddingLeft:  isRTL ? 0 : 20,
              paddingRight: isRTL ? 20 : 0,
              marginBottom: 28,
            }}>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                {t.mission}
              </p>
            </div>

            {/* Value tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {t.tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '5px 14px', borderRadius: 999,
                  background: 'rgba(0,102,255,.06)',
                  border: '1px solid rgba(0,102,255,.18)',
                  color: '#475569', fontSize: '0.72rem',
                  fontWeight: 500, letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to bottom,transparent,rgba(0,0,0,.03))',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
