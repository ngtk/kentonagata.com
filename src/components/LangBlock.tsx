import React from "react"
import { useLanguage } from "../context/LanguageContext"

export function EN({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  return lang === 'en' ? <>{children}</> : null
}

export function JA({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  return lang === 'ja' ? <>{children}</> : null
}
