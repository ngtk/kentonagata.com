import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/Layout"
import PublicationItem from "../../components/PublicationItem"

interface PublicationsIndexData {
  allMdx: {
    nodes: Array<{
      id: string
      frontmatter: {
        title: string
        venue: string
        year: number
        url?: string
      }
      parent: { name: string } | null
    }>
  }
}

export default function PublicationsIndex({
  data,
}: PageProps<PublicationsIndexData>) {
  const items = data.allMdx.nodes

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">Publications</h1>
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No items yet.</p>
        ) : (
          <div>
            {items.map(item => (
              <PublicationItem
                key={item.id}
                slug={(item.parent as { name: string }).name}
                title={item.frontmatter.title}
                venue={item.frontmatter.venue}
                year={item.frontmatter.year}
                url={item.frontmatter.url}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>Publications — Kento Nagata</title>
}

export const query = graphql`
  query PublicationsIndex {
    allMdx(
      filter: {
        internal: { contentFilePath: { regex: "/content/publications/" } }
      }
      sort: { frontmatter: { year: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          venue
          year
          url
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
