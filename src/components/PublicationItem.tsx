import React from "react"
import { Link } from "gatsby"

interface PublicationItemProps {
  slug: string
  title: string
  venue: string
  year: number
  url?: string
}

export default function PublicationItem({
  slug,
  title,
  venue,
  year,
  url,
}: PublicationItemProps) {
  return (
    <div className="flex items-start justify-between py-5 border-b border-gray-200 dark:border-gray-800 last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <Link
          to={`/publications/${slug}`}
          className="font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          {title}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          {venue} · {year}
        </p>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mt-0.5"
          onClick={e => e.stopPropagation()}
        >
          ↗
        </a>
      )}
    </div>
  )
}
