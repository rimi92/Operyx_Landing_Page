import { useState, useEffect } from 'react'
import { useTranslation } from './hooks/useTranslation'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import WhyOperyx from './components/WhyOperyx/WhyOperyx'
import Contact from './components/Contact/contact'
import CTA from './components/CTA'

function App() {
  const { lang, setLang, isRTL } = useTranslation()


  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
   <div
  dir={isRTL ? 'rtl' : 'ltr'}
  className="
    min-h-screen flex flex-col
    text-slate-900 dark:text-white
    transition-colors duration-500

    bg-gradient-to-b
    from-[#CBE6FF]
    via-[#E6F2FF]
    to-[#FFFFFF]

    dark:from-[#07111f]
    dark:via-[#06101a]
    dark:to-[#02060c]
  "
>
      <Navbar
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <WhyOperyx lang={lang} />
      
      <Contact lang={lang} />

      <CTA lang={lang} />
      

      <Footer lang={lang} />
    </div>
  )
}

export default App
