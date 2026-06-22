import { ArrowRight, Briefcase, ClipboardList, BarChart3 } from 'lucide-react'

import heroImage from '../../assets/images/hero.png'


import { translations, type Locale } from '../../i18n'

interface HeroProps {
  lang: Locale
}

export default function Hero({ lang }: HeroProps) {
  const h = translations[lang].hero
  const isRTL = lang === 'ar'
 
  const icons = [
  Briefcase,
  ClipboardList,
  BarChart3,
  Briefcase,
  ClipboardList
]

  return (
    <section
      id="hero"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="pt-[100px] pb-[40px] bg-gradient-to-b from-[#BFE0FF] via-[#EAF4FF] to-[#FFFFFF]"
    >
      <div className="max-w-[1650px] mx-auto px-5">

        {/* ── HERO TOP (UNCHANGED) ── */}
        <div className="relative rounded-[18px] overflow-hidden h-[420px] mb-10">

          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 background: 'linear-gradient(to bottom, #BFE0FF, #EAF4FF'," />

    <div
  className="
relative
z-10

h-full

flex
items-start
"
>
<div className="absolute left-20 top-1/2 -translate-y-1/2 flex flex-col items-start gap-4">

<h1
className="
text-white
font-semibold
text-[47px]
leading-[1.08]
tracking-[-0.03em]
mb-4
"
>

<span
className="
block

whitespace-nowrap
"
>
{`${h.title1} ${h.title2}`}
</span>

<span
className="
block
"
>
{h.title3}
</span>

</h1>

<a
href="#contact"
className="
inline-flex
items-center
gap-4
h-[54px]
px-8
rounded-[12px]
bg-[#005DFF]
text-white
font-semibold
hover:bg-[#0048cc]
transition
mx-auto
"
>
{h.primaryButton}

<ArrowRight size={18} />

</a>

</div>
</div>
        </div>

  <div className="grid grid-cols-12 gap-8 items-center">

  <div className="col-span-12 flex justify-center items-center">

    <div className="grid grid-cols-5 gap-10 w-full max-w-6xl">

      {h.pillars.slice(0, 5).map((item, i) => {
        const Icon = icons[i]

        return (
          <div
            key={i}
            className="
              flex
              flex-col
              items-center
              text-center

              gap-3

              group

              transition-all
              duration-300

              hover:-translate-y-1
            "
          >

            {/* icon */}
            <div className="
              w-12 h-12

              flex items-center justify-center

              rounded-xl

              bg-[#005DFF]/10
              text-[#005DFF]

              group-hover:bg-[#005DFF]/15

              transition
            ">
              <Icon size={20} />
            </div>

            {/* text */}
            <h3 className="
              text-[16px]
              font-semibold
              text-slate-800
              leading-snug
            ">
              {item}
            </h3>

            {/* underline */}
            <div className="
              h-[2px]
              w-0
              bg-[#005DFF]
              group-hover:w-10
              transition-all
              duration-300
              rounded-full
            " />

          </div>
        )
      })}

    </div>

  </div>

</div>
      </div>
    </section>
  )
}