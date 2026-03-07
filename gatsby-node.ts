import path from "path"
import type { GatsbyNode } from "gatsby"

interface MdxNode {
  id: string
  internal: { contentFilePath: string }
  parent: { name: string } | null
}

interface CreatePagesResult {
  portfolio: { nodes: MdxNode[] }
  publications: { nodes: MdxNode[] }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql<CreatePagesResult>(`
    query CreatePages {
      portfolio: allMdx(
        filter: { internal: { contentFilePath: { regex: "/content/portfolio/" } } }
      ) {
        nodes {
          id
          internal {
            contentFilePath
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
      publications: allMdx(
        filter: { internal: { contentFilePath: { regex: "/content/publications/" } } }
      ) {
        nodes {
          id
          internal {
            contentFilePath
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const portfolioTemplate = path.resolve("./src/templates/portfolio-item.tsx")
  const publicationTemplate = path.resolve("./src/templates/publication.tsx")

  result.data?.portfolio.nodes.forEach(node => {
    const slug = (node.parent as { name: string })?.name ?? node.id
    createPage({
      path: `/portfolio/${slug}`,
      component: `${portfolioTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })

  result.data?.publications.nodes.forEach(node => {
    const slug = (node.parent as { name: string })?.name ?? node.id
    createPage({
      path: `/publications/${slug}`,
      component: `${publicationTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })
}
