import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Arco's component .less files use webpack's `~package` syntax. Vite's
// Less preprocessor doesn't speak that, so re-route those specifiers to
// node_modules. Standard Vite + Arco-mobile recipe; lifted directly from
// ../../freedom-ui-kit/examples/basic-app/vite.config.ts.
const arcoTilde = (pkg: string) => ({
  find: `~@arco-design/${pkg}`,
  replacement: path.resolve(__dirname, `./node_modules/@arco-design/${pkg}`),
})

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [arcoTilde("mobile-react"), arcoTilde("mobile-utils")],
  },
  // Less needs JS enabled to evaluate Arco's inline expressions, plus the
  // same `pxtorem` mixin vars the kit uses internally.
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: { "@use-css-vars": 1, "@base-font-size": 50 },
      },
    },
  },
  server: {
    port: 4001,
    host: "127.0.0.1",
    cors: true,
  },
  optimizeDeps: {
    include: [
      "@appboxo/ui-kit",
      "@arco-design/mobile-react",
      "@arco-design/mobile-utils",
      "react",
      "react-dom",
    ],
  },
})
