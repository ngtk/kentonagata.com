import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/Layout"
import PortfolioCard from "../../components/PortfolioCard"
import { useLanguage } from "../../context/LanguageContext"

interface PortfolioIndexData {
  allMdx: {
    nodes: Array<{
      id: string
      frontmatter: {
        title: string
        description: string
        year: number
      }
      parent: { name: string } | null
    }>
  }
}

export default function PortfolioIndex({
  data,
}: PageProps<PortfolioIndexData>) {
  const items = data.allMdx.nodes
  const { t } = useLanguage()

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">{t.portfolio.heading}</h1>
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">{t.portfolio.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <PortfolioCard
                key={item.id}
                slug={(item.parent as { name: string }).name}
                title={item.frontmatter.title}
                description={item.frontmatter.description}
                year={item.frontmatter.year}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>Portfolio — Kento Nagata</title>
}

export const query = graphql`
  query PortfolioIndex {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/portfolio/" } } }
      sort: { frontmatter: { year: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          description
          year
        }
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`
