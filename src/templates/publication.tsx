import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/Layout"
import { EN, JA } from "../components/LangBlock"
import { useLanguage } from "../context/LanguageContext"

interface PublicationData {
  mdx: {
    frontmatter: {
      title: string
      venue: string
      year: number
      url?: string
    }
  }
}

const mdxComponents = { EN, JA }

export default function Publication({
  data,
  children,
}: PageProps<PublicationData>) {
  const { title, venue, year, url } = data.mdx.frontmatter
  const { t } = useLanguage()

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/publications"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-12"
        >
          {t.publications.back}
        </Link>
        <header className="mb-12">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-2 font-mono">
            {venue} · {year}
          </p>
          <h1 className="text-3xl font-bold mb-4 leading-tight">{title}</h1>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {t.publications.external}
            </a>
          )}
        </header>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>
      </article>
    </Layout>
  )
}

export function Head({ data }: PageProps<PublicationData>) {
  return <title>{data.mdx.frontmatter.title} — Kento Nagata</title>
}

export const query = graphql`
  query PublicationTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        venue
        year
        url
      }
    }
  }
`
