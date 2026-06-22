// FILE: src/components/CTA.tsx
'use client'

import { translations, type Locale } from '../i18n'

interface CTAProps {
  lang: Locale
}

export default function CTA({ lang }: CTAProps) {
  const t = translations[lang].cta
  const isRTL = lang === 'ar'

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #BFE0FF 0%, #EAF4FF 50%, #FFFFFF 100%)',
        padding: '80px 24px',
      }}
    >

      {/* ── Top border ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: 1,
          background:
            'linear-gradient(to right, transparent, rgba(0,119,255,.30), transparent)',
        }}
      />

      {/* ── Background blobs ── */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50%',
          top: -60,
          transform: 'translateX(-50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,119,255,.08) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          bottom: -100,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,179,255,.10) 0%, transparent 70%)',
        }}
      />

      {/* ══ CARD ══ */}
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 32,
            border: '1px solid rgba(0,119,255,.18)',
            background:
              'linear-gradient(135deg, #E6F2FF 0%, #F3F8FF 50%, #FFFFFF 100%)',
            padding: '72px 56px',
            boxShadow: '0 10px 70px rgba(0,119,255,.12)',
            textAlign: 'center',
          }}
        >

          {/* Top line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(0,119,255,.35), transparent)',
            }}
          />

          {/* Center glow */}
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              width: 320,
              height: 320,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(0,119,255,.07) 0%, transparent 70%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10 }}>

            {/* ── BADGE ── */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 999,
                border: '1px solid rgba(0,119,255,.25)',
                background: 'rgba(0,119,255,.08)',
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(0,119,255,.9) 0%, rgba(0,119,255,.2) 70%)',
                  boxShadow: '0 0 10px rgba(0,119,255,.5)',
                }}
              />
              <span style={{ color: '#1D4ED8', fontSize: '0.85rem', fontWeight: 600 }}>
                {t.badge}
              </span>
            </div>

            {/* ── TITLE ── */}
            <h2
              style={{
                fontFamily: 'Inter, SF Pro Display, sans-serif',
                fontSize: 'clamp(1.8rem, 3.8vw, 2.9rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0F172A',
                maxWidth: 680,
                margin: '0 auto 20px',
              }}
            >
              {t.title}
            </h2>

            {/* ── SUBTITLE ── */}
            <p
              style={{
                maxWidth: 580,
                margin: '0 auto 44px',
                fontSize: '1rem',
                lineHeight: 1.9,
                color: '#64748B',
              }}
            >
              {t.subtitle}
            </p>

            {/* ── BUTTONS ── */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 14,
                justifyContent: 'center',
              }}
            >

              {/* Primary */}
              <a
                href="#contact"
                style={{
                  minWidth: 200,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #0077FF 0%, #3B82F6 100%)',
                  padding: '15px 36px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  textDecoration: 'none',
                  boxShadow: '0 10px 35px rgba(0,119,255,.35)',
                  transition: 'all .25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 14px 45px rgba(0,119,255,.45)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 10px 35px rgba(0,119,255,.35)'
                }}
              >
                {t.primaryButton}
              </a>

              {/* Secondary */}
              <a
                href="https://wa.me/YOURNUMBER"
                target="_blank"
                rel="noreferrer"
                style={{
                  minWidth: 200,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 14,
                  border: '1px solid rgba(0,119,255,.25)',
                  background: 'rgba(255,255,255,.4)',
                  backdropFilter: 'blur(8px)',
                  padding: '15px 36px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#475569',
                  textDecoration: 'none',
                  transition: 'all .25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.borderColor = 'rgba(0,119,255,.4)'
                  el.style.background = 'rgba(0,119,255,.08)'
                  el.style.color = '#1D4ED8'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'rgba(0,119,255,.25)'
                  el.style.background = 'rgba(255,255,255,.4)'
                  el.style.color = '#475569'
                }}
              >
                {t.secondaryButton}
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}