import logo from '../../assets/images/logo3.png'
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Globe,
} from 'lucide-react'

import { translations, type Locale } from '../../i18n'

interface FooterProps {
  lang: Locale
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer
  const isRTL = lang === 'ar'

  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative overflow-hidden border-t border-slate-200
      bg-gradient-to-b from-[#BFE0FF] via-[#EAF4FF] to-[#FFFFFF]"
    >

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 bottom-0 h-[320px] w-[520px] rounded-full bg-blue-100 blur-[120px] opacity-70" />
        <div className="absolute right-1/4 top-0 h-[240px] w-[340px] rounded-full bg-sky-100 blur-[100px] opacity-70" />
      </div>

      {/* TOP LINE */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">

          {/* BRAND */}
          <div className="flex flex-col gap-10">
            <a href="#" className="group w-fit">
              <img
                src={logo}
                alt="OPERYX"
                className="h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

          <p className="max-w-md text-sm leading-relaxed text-slate-600m l-0 md: ml-0 md:-ml-4">
  {t.tagline}
</p>

            <div className="inline-flex w-fit items-center gap-2 rounded-full
              border border-blue-200 bg-blue-50/60 backdrop-blur px-4 py-2 text-xs text-blue-700">
              <Globe size={13} />
              {t.international}
            </div>
          </div>

          {/* SERVICES */}
          <div className="flex flex-col gap-5 lg:pt-14">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              {t.services}
            </h4>
            <ul className="flex flex-col gap-3">
              {t.servicesList.map((service, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="group flex items-center gap-2 text-sm text-slate-600
                    transition-colors duration-300 hover:text-[#0077FF]"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-400 group-hover:bg-[#0077FF]" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-5 lg:pt-14">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              {t.company}
            </h4>
            <ul className="flex flex-col gap-3">
              {t.companyList.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-slate-600
                    transition-all duration-300 hover:text-slate-900"
                  >
                    <ArrowUpRight
                      size={12}
                      className="-ml-1 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[#0077FF]"
                    />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-5 lg:pt-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              {t.contact}
            </h4>

            <ul className="flex flex-col gap-4">

              <li>
                <a href="mailto:contact@operyx.com"
                  className="group flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50/60 backdrop-blur group-hover:bg-blue-100">
                    <Mail size={14} className="text-[#0077FF]" />
                  </div>
                  <span>contact@operyx-consulting.com</span>
                </a>
              </li>

              <li>
                <a href="tel:+21654885618"
                  className="group flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50/60 backdrop-blur group-hover:bg-blue-100">
                    <Phone size={14} className="text-[#0077FF]" />
                  </div>
                  <span>🇹🇳 +216 54 88681
		</span>
                </a>
              </li>

              <li>
                <a href="tel:+4915228562716"
                  className="group flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50/60 backdrop-blur group-hover:bg-blue-100">
                    <Phone size={14} className="text-[#0077FF]" />
                  </div>
                 <span>🇩🇪 +49 152 2856 2716</span>
                </a>
              </li>

              <li>
                <a href="https://wa.me/21628554513"
                  className="group flex items-center gap-3 text-sm text-slate-600 hover:text-[#25D366]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-200 bg-green-50/40 backdrop-blur group-hover:bg-green-100">
                    <MessageCircle size={14} className="text-[#25D366]" />
                  </div>
                <span>🇹🇳 WhatsApp +216 28 554 513</span>
                </a>
              </li>

              <li>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50/60 backdrop-blur">
                    <MapPin size={14} className="text-[#0077FF]" />
                  </div>
                  <span>{t.location}</span>
                </div>
              </li>

            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} OPERYX. {t.rights}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-700">
              {t.legal}
            </a>
            <span className="text-slate-300">·</span>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-700">
              {t.terms}
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
