import path from "node:path"
import { fileURLToPath } from "node:url"
import { createMDX } from "fumadocs-mdx/next"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Pin Turbopack's root to this package so the sibling pnpm workspace
  // (preview/) doesn't confuse it into resolving Next from the wrong dir.
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*", "./content/**/*", "./preview/src/**/*"],
  },
  redirects() {
    return [
      // Short alias that the team may type by habit.
      {
        source: "/components",
        destination: "/docs/components",
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
