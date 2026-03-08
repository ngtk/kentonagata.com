import "./src/styles/global.css"
import React from "react"
import { LanguageProvider } from "./src/context/LanguageContext"
import type { GatsbySSR } from "gatsby"

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}) => React.createElement(LanguageProvider, null, element)
