import React from "react"
import { Link } from "gatsby"
import { useLanguage } from "../context/LanguageContext"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          KN
        </Link>
        <nav className="flex gap-6 text-sm font-medium items-center">
          <Link
            to="/portfolio"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            {t.nav.portfolio}
          </Link>
          <Link
            to="/publications"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            {t.nav.publications}
          </Link>
          <span className="flex items-center gap-1">
            <button
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'font-bold' : 'opacity-50 hover:opacity-75 transition-opacity'}
            >
              EN
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setLang('ja')}
              className={lang === 'ja' ? 'font-bold' : 'opacity-50 hover:opacity-75 transition-opacity'}
            >
              JA
            </button>
          </span>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
