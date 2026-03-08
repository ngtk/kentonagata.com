import React from "react"
import KeyVisual from "./KeyVisual"

export default function Hero() {
  return (
    <section className="flex-1 grid grid-cols-1 md:grid-cols-2">
      {/* Left: text */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-none">
          Kento
          <br />
          Nagata
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-4 font-light">
          Software Developer
        </p>
        <p className="text-base text-gray-400 dark:text-gray-500 mb-10 max-w-xs leading-relaxed">
          Building clean, useful software.
        </p>
        <a
          href="mailto:me@kentonagata.com"
          className="group inline-flex items-center gap-2 text-sm font-medium border-b border-gray-900 dark:border-gray-100 pb-0.5 w-fit hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          Say Hello
          <span className="transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Right: key visual */}
      <div className="h-full min-h-[320px]">
        <KeyVisual />
      </div>
    </section>
  )
}
