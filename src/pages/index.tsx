import React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero"

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <title>Kento Nagata — Software Developer</title>
      <meta
        name="description"
        content="Kento Nagata — Software Developer."
      />
    </>
  )
}
