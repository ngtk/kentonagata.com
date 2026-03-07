import React from "react"

export default function KeyVisual() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm"
      >
        {/* Outer dashed ring — slow spin */}
        <circle
          cx="200"
          cy="200"
          r="145"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 6"
          className="text-gray-300 dark:text-gray-700 animate-spin-slow"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Mid dashed ring — counter-spin */}
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 9"
          className="text-gray-400 dark:text-gray-600 animate-spin-slower"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Large floating ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="88"
          ry="82"
          fill="currentColor"
          className="text-gray-100 dark:text-gray-800 animate-float"
        />

        {/* Top-right accent circle */}
        <circle
          cx="282"
          cy="118"
          r="28"
          fill="currentColor"
          className="text-gray-200 dark:text-gray-700 animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Bottom-left polygon */}
        <polygon
          points="118,300 88,342 148,342"
          fill="currentColor"
          className="text-gray-300 dark:text-gray-600 animate-float"
          style={{ animationDelay: "1.5s", transformOrigin: "118px 321px" }}
        />

        {/* Central dot */}
        <circle
          cx="200"
          cy="200"
          r="16"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        />

        {/* Small accent dots */}
        <circle
          cx="262"
          cy="262"
          r="5"
          fill="currentColor"
          className="text-gray-400 dark:text-gray-500 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="143"
          cy="143"
          r="4"
          fill="currentColor"
          className="text-gray-400 dark:text-gray-500 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <circle
          cx="258"
          cy="152"
          r="3"
          fill="currentColor"
          className="text-gray-300 dark:text-gray-600"
        />

        {/* Line accents */}
        <line
          x1="108"
          y1="262"
          x2="168"
          y2="182"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-300 dark:text-gray-600"
        />
        <line
          x1="242"
          y1="232"
          x2="312"
          y2="282"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-300 dark:text-gray-600"
        />
      </svg>
    </div>
  )
}
