export type ServiceItem = {
  title: string
  desc: string
}

export type WhyItem = {
  title: string
  desc: string
}

export type Translation = {
  
  nav: {
    about: string
    services: string
    why: string
    contact: string
    cta: string
  }

  hero: {
  badge: string
  title1: string
  title2: string
  title3: string
  subtitle: string
  primaryButton: string
  cta2: string
  stats: { value: number; suffix: string; label: string }[]
  tags: string[]
  trustItems: string[]
  pillars: string[]   // ← NOUVEAU
}

about: {
  label: string
  title: string
  description: string
  mission: string
  support: string
  cta: string
  tags: string[]
}

  services: {
    label: string
    title: string
    subtitle: string
    supportTitle: string
    supportText: string
    cta: string
    supportItems: string[]
    list: ServiceItem[]
  }

  why: {
    label: string
    title: string
    subtitle: string
    items: WhyItem[]
  }

   whyOperyx: {
    label: string
    title: string
    subtitle: string
    items: WhyItem[]
  }

contact: {
  whatsappLabel: string
  badge: string
  title: string
  subtitle: string

  infoTitle: string
  infoText: string

  emailLabel: string
  phoneLabel: string

  supportLabel: string
  supportText: string
phone: string
phonePlaceholder: string
robot: string
  formTitle: string

  name: string
  namePlaceholder: string

  email: string
  emailPlaceholder: string

  company: string
  companyPlaceholder: string

  message: string
  messagePlaceholder: string

  send: string
}

 footer: {
  tagline: string
  services: string
  company: string
  contact: string
  international: string
  available: string
  ctaTitle: string
  ctaSubtitle: string
  startProject: string
  location: string
  servicesList: string[]
  companyList: string[]
  rights: string
  legal: string
  terms: string
},
cta: {
  badge: string
  title: string
  subtitle: string
  primaryButton: string
  secondaryButton: string
}
}

export type Locale = 'en' | 'fr' | 'de' | 'ar'
export type Translations = Record<Locale, Translation>