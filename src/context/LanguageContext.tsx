import React, { createContext, useContext, useEffect, useState } from 'react'
import { Lang, translations } from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations['en']
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations['en'],
})

function getCookieLang(): Lang | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )lang=([^;]*)/)
  if (!match) return null
  const val = decodeURIComponent(match[1])
  return val === 'en' || val === 'ja' ? val : null
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const cookieLang = getCookieLang()
    if (cookieLang) setLangState(cookieLang)
  }, [])

  function setLang(newLang: Lang) {
    setLangState(newLang)
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
