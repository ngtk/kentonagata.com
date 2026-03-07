import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import Layout from "../components/Layout"

interface PortfolioItemData {
  mdx: {
    frontmatter: {
      title: string
      description: string
      year: number
    }
  }
}

export default function PortfolioItem({
  data,
  children,
}: PageProps<PortfolioItemData>) {
  const { title, description, year } = data.mdx.frontmatter

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-12"
        >
          ← Portfolio
        </Link>
        <header className="mb-12">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-2 font-mono">
            {year}
          </p>
          <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </header>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          {children}
        </div>
      </article>
    </Layout>
  )
}

export function Head({ data }: PageProps<PortfolioItemData>) {
  return <title>{data.mdx.frontmatter.title} — Kento Nagata</title>
}

export const query = graphql`
  query PortfolioItemTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        year
      }
    }
  }
`
