import { useState } from "react"
import { translations, type Locale } from "../i18n"
import { defaultLocale } from "../i18n/config"

export function useTranslation(initialLocale?: Locale) {
  const [locale, setLocale] = useState<Locale>(initialLocale || defaultLocale)

  const t = translations[locale] ?? translations.en

  const isRTL = locale === "ar" 

  return {
    t,
    lang: locale,
    setLang: setLocale,
    isRTL,
  }
}