import "./src/styles/global.css"
import React from "react"
import { LanguageProvider } from "./src/context/LanguageContext"
import type { GatsbyBrowser } from "gatsby"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => React.createElement(LanguageProvider, null, element)
