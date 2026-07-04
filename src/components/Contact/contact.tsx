'use client'

import { useState } from 'react'
import type { Locale } from '../../i18n'
import { translations } from '../../i18n'
import { Mail, Phone, MessageCircle, Globe, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from './contact.schema'
// email service will be wired later

interface ContactProps {
  lang: Locale
}

/* ── shared input style ────────────────────────────────────────── */
const inputCls =
  'w-full h-12 rounded-xl border border-slate-200 bg-white ' +
  'px-4 text-[13.5px] text-slate-800 placeholder:text-slate-400 ' +
  'outline-none transition-all duration-200 ' +
  'focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/[0.12] ' +
  'focus:shadow-[0_0_20px_rgba(59,130,246,0.10)]'

const inputErrorCls =
  'w-full h-12 rounded-xl border border-red-400 bg-white ' +
  'px-4 text-[13.5px] text-slate-800 placeholder:text-slate-400 ' +
  'outline-none transition-all duration-200 ' +
  'focus:border-red-400 focus:ring-2 focus:ring-red-400/[0.12]'

const textareaCls =
  'w-full rounded-xl border border-slate-200 bg-white ' +
  'px-4 py-3 text-[13.5px] leading-relaxed text-slate-800 placeholder:text-slate-400 ' +
  'outline-none resize-none transition-all duration-200 ' +
  'focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/[0.12]'

const textareaErrorCls =
  'w-full rounded-xl border border-red-400 bg-white ' +
  'px-4 py-3 text-[13.5px] leading-relaxed text-slate-800 placeholder:text-slate-400 ' +
  'outline-none resize-none transition-all duration-200 ' +
  'focus:border-red-400 focus:ring-2 focus:ring-red-400/[0.12]'

/* ── country codes ─────────────────────────────────────────────── */
const COUNTRY_CODES = [
  { code: '+93',  flag: '🇦🇫', label: 'AF' },
  { code: '+213', flag: '🇩🇿', label: 'DZ' },
  { code: '+54',  flag: '🇦🇷', label: 'AR' },
  { code: '+61',  flag: '🇦🇺', label: 'AU' },
  { code: '+43',  flag: '🇦🇹', label: 'AT' },
  { code: '+973', flag: '🇧🇭', label: 'BH' },
  { code: '+32',  flag: '🇧🇪', label: 'BE' },
  { code: '+55',  flag: '🇧🇷', label: 'BR' },
  { code: '+1',   flag: '🇨🇦', label: 'CA' },
  { code: '+86',  flag: '🇨🇳', label: 'CN' },
  { code: '+57',  flag: '🇨🇴', label: 'CO' },
  { code: '+385', flag: '🇭🇷', label: 'HR' },
  { code: '+420', flag: '🇨🇿', label: 'CZ' },
  { code: '+45',  flag: '🇩🇰', label: 'DK' },
  { code: '+20',  flag: '🇪🇬', label: 'EG' },
  { code: '+358', flag: '🇫🇮', label: 'FI' },
  { code: '+33',  flag: '🇫🇷', label: 'FR' },
  { code: '+49',  flag: '🇩🇪', label: 'DE' },
  { code: '+233', flag: '🇬🇭', label: 'GH' },
  { code: '+30',  flag: '🇬🇷', label: 'GR' },
  { code: '+36',  flag: '🇭🇺', label: 'HU' },
  { code: '+91',  flag: '🇮🇳', label: 'IN' },
  { code: '+62',  flag: '🇮🇩', label: 'ID' },
  { code: '+964', flag: '🇮🇶', label: 'IQ' },
  { code: '+353', flag: '🇮🇪', label: 'IE' },
  { code: '+972', flag: '🇮🇱', label: 'IL' },
  { code: '+39',  flag: '🇮🇹', label: 'IT' },
  { code: '+81',  flag: '🇯🇵', label: 'JP' },
  { code: '+962', flag: '🇯🇴', label: 'JO' },
  { code: '+254', flag: '🇰🇪', label: 'KE' },
  { code: '+82',  flag: '🇰🇷', label: 'KR' },
  { code: '+965', flag: '🇰🇼', label: 'KW' },
  { code: '+961', flag: '🇱🇧', label: 'LB' },
  { code: '+218', flag: '🇱🇾', label: 'LY' },
  { code: '+352', flag: '🇱🇺', label: 'LU' },
  { code: '+60',  flag: '🇲🇾', label: 'MY' },
  { code: '+212', flag: '🇲🇦', label: 'MA' },
  { code: '+52',  flag: '🇲🇽', label: 'MX' },
  { code: '+31',  flag: '🇳🇱', label: 'NL' },
  { code: '+64',  flag: '🇳🇿', label: 'NZ' },
  { code: '+234', flag: '🇳🇬', label: 'NG' },
  { code: '+47',  flag: '🇳🇴', label: 'NO' },
  { code: '+968', flag: '🇴🇲', label: 'OM' },
  { code: '+92',  flag: '🇵🇰', label: 'PK' },
  { code: '+970', flag: '🇵🇸', label: 'PS' },
  { code: '+48',  flag: '🇵🇱', label: 'PL' },
  { code: '+351', flag: '🇵🇹', label: 'PT' },
  { code: '+974', flag: '🇶🇦', label: 'QA' },
  { code: '+40',  flag: '🇷🇴', label: 'RO' },
  { code: '+7',   flag: '🇷🇺', label: 'RU' },
  { code: '+966', flag: '🇸🇦', label: 'SA' },
  { code: '+221', flag: '🇸🇳', label: 'SN' },
  { code: '+65',  flag: '🇸🇬', label: 'SG' },
  { code: '+27',  flag: '🇿🇦', label: 'ZA' },
  { code: '+34',  flag: '🇪🇸', label: 'ES' },
  { code: '+46',  flag: '🇸🇪', label: 'SE' },
  { code: '+41',  flag: '🇨🇭', label: 'CH' },
  { code: '+963', flag: '🇸🇾', label: 'SY' },
  { code: '+216', flag: '🇹🇳', label: 'TN' },
  { code: '+90',  flag: '🇹🇷', label: 'TR' },
  { code: '+380', flag: '🇺🇦', label: 'UA' },
  { code: '+971', flag: '🇦🇪', label: 'AE' },
  { code: '+44',  flag: '🇬🇧', label: 'GB' },
  { code: '+1',   flag: '🇺🇸', label: 'US' },
  { code: '+84',  flag: '🇻🇳', label: 'VN' },
  { code: '+967', flag: '🇾🇪', label: 'YE' },
]

/* ── contact item ──────────────────────────────────────────────── */
function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600">
          {icon}
        </div>
        <p className="text-[14px] font-bold capitalize text-slate-800">
          {label}
        </p>
      </div>
      <div>{children}</div>
    </div>
  )
}

/* ── field error ───────────────────────────────────────────────── */
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-red-500 pl-1">
      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 4a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0V5zm-.75 6a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      {message}
    </p>
  )
}

/* ── main ──────────────────────────────────────────────────────── */
export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact
  const isRTL = lang === 'ar'

  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleCaptcha = () => {
    if (captchaLoading || captchaChecked) return
    setCaptchaLoading(true)
    setTimeout(() => {
      setCaptchaLoading(false)
      setCaptchaChecked(true)
    }, 1800)
  }

  /* ── form ── */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { countryCode: '+216' },
  })

  const onSubmit = async (data: ContactFormData) => {
    if (!captchaChecked) return

    // TODO: wire email service here
    console.log('Form data:', {
      name:    data.name,
      company: data.company,
      phone:   `${data.countryCode} ${data.phone}`,
      email:   data.email,
      message: data.message,
    })
    await new Promise((r) => setTimeout(r, 800)) // simulate async

    setSubmitSuccess(true)
    reset()
    setCaptchaChecked(false)
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
   <section
  id="contact"
  dir={isRTL ? 'rtl' : 'ltr'}
  style={{ fontFamily: 'Arial, sans-serif' }}
  className="relative overflow-hidden bg-gradient-to-b from-[#BFE0FF] via-[#EAF4FF] to-[#FFFFFF] py-28 text-slate-800 md:py-36"
>
      {/* ── glows ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-160px] h-[640px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-[150px]" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full bg-cyan-100/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-10xl px-4 sm:px-6 lg:px-8">

        {/* ═════════ HEADER ═════════ */}
        <div className="mb-24 flex flex-col items-center text-center gap-8">
          <div className="h-3" />

          {/* BADGE */}
          <div className="
            inline-flex items-center gap-3 rounded-full
            border border-blue-500/20 bg-blue-500/[0.06]
            px-5 py-2 shadow-[0_0_18px_rgba(59,130,246,0.08)]
V          ">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-20"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-blue-700 leading-none">
              {t.badge}
            </span>
          </div>

          {/* TITLE */}
                <h1
            className="max-w-5xl text-[42px] sm:text-[54px] lg:text-[72px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-900"
            >
            {t.title}
            </h1>

          {/* SUBTITLE */}
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-slate-500 mt-2">
            {t.subtitle}
          </p>

          {/* DIVIDER */}
          <div className="mt-4 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_16px_rgba(37,99,235,0.35)]" />
        </div>

        {/* ═════════ GRID SECTION ═════════ */}
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-12 max-w-4xl mx-auto w-full px-4">

            {/* ── CONTACT CARD ── */}
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-b from-[#BFE0FF] via-[#EAF4FF] to-[#FFFFFF] shadow-sm px-10 py-16 md:px-16">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              <div className="h-6" />
V
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">

                <ContactItem label={t.phoneLabel} icon={<Phone size={20} strokeWidth={1.5} className="text-blue-600" />}>
                  <div className="flex flex-col gap-2 items-center ml-10-">
                    <a href="tel:+21654885618" className="text-[18px] font-bold font-mono text-slate-800 hover:text-blue-600 transition">🇹🇳 +216 54 885 618</a>
                    <a href="tel:+4915228562716" className="text-[18px] font-bold font-mon text-slate-800 hover:text-blue-600 transition">🇩🇪 +49 152 2856 2716</a>
                  </div>
                </ContactItem>

                <ContactItem label={t.whatsappLabel} icon={<MessageCircle size={20} strokeWidth={1.5} className="text-green-600" />}>
                  <div className="flex flex-col gap-2 items-center">
                    <a href="https://wa.me/21628554513" target="_blank" rel="noopener noreferrer" className="text-[18px] font-bold font-mon text-slate-800 hover:text-green-600 transition">🇹🇳 +216 28 554 513</a>
                    <a href="https://wa.me/4915228562716" target="_blank" rel="noopener noreferrer" className="text-[18px] font-bold font-mon text-slate-800 hover:text-green-600 transition">🇩🇪 +49 152 2856 2716</a>
                  </div>
                </ContactItem>

                <ContactItem label={t.emailLabel} icon={<Mail size={20} strokeWidth={1.5} className="text-blue-600" />}>
                  <a href="mailto:contact@operyx-consulting.com" className="text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition">
                    contact@operyx-consulting.com
                  </a>
                </ContactItem>

                <ContactItem label={t.supportLabel} icon={<Globe size={20} strokeWidth={1.5} className="text-blue-600" />}>
                  <p className="text-[14px] font-medium leading-relaxed text-slate-500 max-w-[280px]">
                    {t.supportText}
                  </p>
                </ContactItem>

              </div>

              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-100/60 blur-[80px] pointer-events-none" />
            </div>

            {/* ── FORM TITLE ── */}
            <div className="text-center mt-16 mb-16 pt-2 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <div className="
                  flex h-14 w-14 items-center justify-center rounded-2xl
                  border border-cyan-400/30 bg-gradient-to-br from-cyan-100 to-blue-100
                  shadow-[0_0_20px_rgba(34,211,238,0.08)]
                ">
                  <MessageCircle size={28} strokeWidth={1.8} className="text-blue-600" />
                </div>
                <h3 className="text-[28px] sm:text-[34px] font-semibold tracking-normal text-slate-800 leading-tight">
                  {t.formTitle}
                </h3>
              </div>
            </div>

            {/* ── FORM ── */}
            <div className="flex justify-center w-full px-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-8 w-full max-w-2xl"
              >

                {/* SUCCESS BANNER */}
                {submitSuccess && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-[13.5px] font-medium">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 text-emerald-500">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Message envoyé avec succès — nous vous répondrons rapidement !
                  </div>
                )}

            
                <div className="flex flex-col">
                 {/* NAME */}
                    <label className="mb-2 text-[15px] font-bold tracking-normal text-slate-800 leading-normal">
                    {t.name.charAt(0).toUpperCase() + t.name.slice(1).toLowerCase()}{' '}
                    <span className="text-red-500">*</span>
                    </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder={t.namePlaceholder}
                    autoComplete="name"
                    className={errors.name ? inputErrorCls : inputCls}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                {/* COMPANY */}
                <div className="flex flex-col">
                  <label  className="mb-2 text-[15px] font-bold tracking-normal text-slate-800 leading-normal">
                    {t.company.charAt(0).toUpperCase() + t.company.slice(1).toLowerCase()}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    placeholder={t.companyPlaceholder}
                    autoComplete="organization"
                    className={errors.company ? inputErrorCls : inputCls}
                  />
                  <FieldError message={errors.company?.message} />
                </div>

                {/* PHONE */}
                <div className="flex flex-col">
                  <label  className="mb-2 text-[15px] font-bold tracking-normal text-slate-800 leading-normal">
                    {t.phone} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      {...register('countryCode')}
                      className="
                        h-12 w-36 shrink-0 rounded-xl border border-slate-200 bg-white
                        px-2 text-[13px] text-slate-700 outline-none
                        transition-all duration-200
                        focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/[0.12]
                      "
                    >
                      {COUNTRY_CODES.map((c, i) => (
                        <option key={`${c.code}-${c.label}-${i}`} value={c.code}>
                          {c.flag} {c.label} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register('phone')}
                      type="text"
                      inputMode="numeric"
                      placeholder={t.phonePlaceholder ?? '12345678'}
                      autoComplete="tel-national"
                      className={`flex-1 ${errors.phone ? inputErrorCls : inputCls}`}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                      }}
                    />
                  </div>
                  <FieldError message={errors.phone?.message} />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col">
                <label className="mb-2 text-[15px] font-bold tracking-normal text-slate-800 leading-normal">
                    {t.email}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={t.emailPlaceholder ?? 'john@company.com'}
                    autoComplete="email"
                    className={errors.email ? inputErrorCls : inputCls}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col">
                  <label className="mb-2 text-[15px] font-bold tracking-normal text-slate-800 leading-normal">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    placeholder={t.messagePlaceholder}
                    className={errors.message ? textareaErrorCls : textareaCls}
                  />
                  <FieldError message={errors.message?.message} />
                </div>

                {/* CAPTCHA */}
                <label
                  onClick={handleCaptcha}
                  className="
                    flex items-center justify-between
                    rounded-[6px] border border-[#d3d3d3]
                    bg-[#f9f9f9] px-4 py-3
                    max-w-[340px] cursor-pointer select-none
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-6 w-6 items-center justify-center rounded-[2px] border-2 border-[#6b6b6b] bg-white">
                      {captchaLoading && (
                        <div className="h-4 w-4 rounded-full border-2 border-[#c9c9c9] border-t-[#4285f4] animate-spin" />
                      )}
                      {captchaChecked && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="3" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[14px] text-[#222]">{t.robot}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full border-[4px] border-[#c9c9c9] border-t-[#4285f4] ${captchaLoading ? 'animate-spin' : ''}`} />
                    <span className="mt-1 text-[10px] text-[#666]">reCAPTCHA</span>
                  </div>
                </label>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaChecked}
                  className="
                    mt-2 group flex items-center justify-center gap-2
                    h-15 rounded-xl
                    bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500
                    text-white font-semibold text-[14px]
                    shadow-[0_0_30px_rgba(37,99,235,0.20)]
                    transition-all duration-300
                    hover:enabled:-translate-y-1
                    hover:enabled:shadow-[0_0_55px_rgba(37,99,235,0.35)]
                    active:enabled:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    relative overflow-hidden
                  "
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative flex items-center gap-2">
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <>
                        {t.send}
                        <Send size={15} />
                      </>
                    )}
                  </span>
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
