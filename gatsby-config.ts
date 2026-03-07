import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Kento Nagata",
    description: "Software Developer",
    author: "Kento Nagata",
    email: "me@kentonagata.com",
    siteUrl: "https://kentonagata.com",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "portfolio",
        path: path.resolve("./src/content/portfolio"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "publications",
        path: path.resolve("./src/content/publications"),
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
  ],
}

export default config
