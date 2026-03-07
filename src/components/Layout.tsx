import React from "react"
import { Link } from "gatsby"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          KN
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link
            to="/portfolio"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            to="/publications"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            Publications
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="w-full px-6 py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>© Kento Nagata</span>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/ngtk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://github.com/ngtk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
