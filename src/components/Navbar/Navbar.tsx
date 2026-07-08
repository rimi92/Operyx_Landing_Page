import { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react'

import { translations, type Locale } from '../../i18n'
import logoOperyx from '../../assets/images/logo2-operyx.png'

interface NavbarProps {
  lang: Locale
  setLang: (l: Locale) => void
  darkMode: boolean
  setDarkMode: (
    v: boolean | ((prev: boolean) => boolean)
  ) => void
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
] as const

export default function Navbar({
  lang,
  setLang,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  const t = translations[lang].nav
  const isRTL = lang === 'ar'

  const [scrolled, setScrolled] =
    useState(false)

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [langOpen, setLangOpen] =
    useState(false)

  const langRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > 20)

    const closeLang = (
      e: MouseEvent
    ) => {
      if (
        langRef.current &&
        !langRef.current.contains(
          e.target as Node
        )
      ) {
        setLangOpen(false)
      }
    }

    window.addEventListener(
      'scroll',
      onScroll
    )

    document.addEventListener(
      'mousedown',
      closeLang
    )

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      )

      document.removeEventListener(
        'mousedown',
        closeLang
      )
    }
  }, [])

  const navLinks = [
    {
      href: '#about',
      label: t.about,
    },
    {
      href: '#services',
      label: t.services,
    },
    {
      href: '#why-operyx',
      label: t.why,
    },
    {
      href: '#contact',
      label: t.contact,
    },
  ]

  const currentLang =
    LANGUAGES.find(
      (l) => l.code === lang
    )!

  return (
    <header
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`
fixed
top-0
left-0
right-0
z-[999]
transition-all
duration-500

${
  scrolled
    ? `
bg-[#07111f]/85
backdrop-blur-3xl
border-b
border-white/10
shadow-[0_15px_50px_rgba(0,0,0,.25)]
`
    : 'bg-transparent'
}
`}
    >
      <div
        className="
max-w-[1440px]
mx-auto
px-6
lg:px-12
"
      >
        <div
          className="
h-[88px]
lg:h-[110px]

flex
items-center
justify-between
"
        >
          {/* LOGO */}

          <a
            href="#hero"
            className="
shrink-0
group
transition
duration-500
hover:scale-[1.04]
"
          >
            <img
              src={logoOperyx}
              alt="Operyx"
              className="
mt-3
ml-2
h-[95px]
sm:h-[120px]
lg:h-[180px]

w-auto
object-contain

group-hover:-translate-y-1

transition-all
duration-500
"
            />
          </a>

          {/* DESKTOP */}

          <nav
            className="
hidden
lg:flex
items-center
gap-10
"
          >
            {navLinks.map(
              (link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
relative

text-[20px]

text-white/90

hover:text-cyan-400

transition

after:absolute
after:left-0
after:-bottom-2

after:h-[2px]
after:w-0

after:bg-cyan-400

hover:after:w-full

after:duration-500
"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* ACTIONS */}

          <div
            className="
hidden
lg:flex
items-center
gap-3
"
          >
            {/* THEME */}

            <button
              onClick={() =>
                setDarkMode(
                  (v) => !v
                )
              }
              className="
w-12
h-12

rounded-2xl

bg-white/5

border
border-white/10

text-white

flex
items-center
justify-center

hover:border-cyan-400

transition
"
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* LANG */}
{/* LANG */}

<div
  ref={langRef}
  className="relative"
>
  <button
    onClick={() =>
      setLangOpen(!langOpen)
    }
    className="
h-[52px]

px-5

rounded-[18px]

flex
items-center
gap-3

bg-white/[0.06]

border
border-white/10

text-white

hover:border-cyan-400
hover:bg-white/[0.08]

transition-all
duration-300
"
  >
    <Globe
      size={17}
      className="
text-cyan-300
"
    />

    <span className="text-[18px]">
      {currentLang.flag}
    </span>

    <span
      className="
text-[14px]
font-medium
uppercase
tracking-[0.08em]
"
    >
      {lang}
    </span>

    <ChevronDown
      size={16}
      className={`
transition
duration-300
${
  langOpen
    ? 'rotate-180'
    : ''
}
`}
    />
  </button>

  <div
    className={`
absolute
right-0
top-[68px]

w-[240px]

rounded-[24px]

bg-[#091321]

border
border-white/10

backdrop-blur-xl

shadow-[0_20px_60px_rgba(0,0,0,.35)]

p-2

transition-all
duration-300

${
  langOpen
    ? `
opacity-100
translate-y-0
scale-100
pointer-events-auto
`
    : `
opacity-0
translate-y-2
scale-[0.98]
pointer-events-none
`
}
`}
  >
    <div className="space-y-1">
      {LANGUAGES.map(
        (l) => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code)

              setLangOpen(false)
            }}
            className={`
w-full

px-4
py-[15px]

rounded-[16px]

flex
items-center
gap-4

transition-all
duration-300

${
  lang === l.code
    ? `
bg-cyan-500/12
border
border-cyan-400/20
`
    : `
hover:bg-white/5
`
}
`}
          >
            <span
              className="
text-[22px]
"
            >
              {l.flag}
            </span>

            <div
              className="
flex
flex-col
items-start
"
            >
              <span
                className="
text-[15px]
font-medium
text-white
"
              >
                {l.label}
              </span>

              <span
                className="
text-[11px]
uppercase

text-white/40
"
              >
                {l.code}
              </span>
            </div>
          </button>
        )
      )}
    </div>
  </div>
</div>

            {/* CTA */}

            <a
              href="#contact"
              className="
h-[56px]

px-10

inline-flex
items-center

rounded-2xl

bg-gradient-to-r
from-[#005DFF]
to-[#00BFFF]

text-white

font-semibold

hover:scale-[1.03]

transition
"
            >
              {t.cta}
            </a>
          </div>

          {/* MOBILE */}

          <button
            className="
lg:hidden
text-white
"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
          >
            {mobileOpen ? (
              <X size={32} />
            ) : (
              <Menu size={32} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <div
        className={`
lg:hidden

overflow-hidden

transition-all
duration-500

${
  mobileOpen
    ? 'max-h-[500px]'
    : 'max-h-0'
}
`}
      >
        <div
          className="
bg-[#07111f]

px-6
pb-8
"
        >
          {navLinks.map(
            (link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMobileOpen(
                    false
                  )
                }
                className="
block

py-5

text-white

border-b
border-white/5
"
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="#contact"
            className="
mt-6

h-[54px]

rounded-2xl

flex
items-center
justify-center

bg-gradient-to-r
from-[#005DFF]
to-[#00BFFF]

text-white
"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
