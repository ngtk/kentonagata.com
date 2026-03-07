import React from "react"
import { Link } from "gatsby"

interface PortfolioCardProps {
  slug: string
  title: string
  description: string
  year: number
}

export default function PortfolioCard({
  slug,
  title,
  description,
  year,
}: PortfolioCardProps) {
  return (
    <Link
      to={`/portfolio/${slug}`}
      className="group block border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <span className="text-gray-300 dark:text-gray-700 text-xs font-mono">
          {year}
        </span>
      </div>
      <div className="p-5">
        <h2 className="font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  )
}
