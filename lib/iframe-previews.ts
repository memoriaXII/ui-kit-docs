/**
 * Component names that have a real `@appboxo/ui-kit` preview implemented in
 * the sibling Vite app (`preview/src/previews/*`). When ComponentPreview's
 * `name` matches one of these we render an iframe pointing at the preview
 * app instead of the shadcn-placeholder Index demo.
 *
 * The preview app routes are keyed by the same string, e.g. `button` -> a
 * `<ButtonPreview />` mounted under Arco's ContextProvider + UIKitProvider.
 */
export const IFRAME_PREVIEWS = new Set<string>([
  "button",
  "card",
  "checkbox",
  "copyable",
  "date-picker",
  "dial-code-selector",
  "drawer",
  "flex",
  "input",
  "placeholder",
  "radio",
  "search-bar",
  "summary-table",
  "textarea",
  "time-picker",
  "tip",
  "toast",
  "touch-cell",
  "typography",
])

export const PREVIEW_ORIGIN =
  process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? "http://127.0.0.1:4001"

/**
 * Given the `name` prop on <ComponentPreview /> (e.g. "button-demo"),
 * resolve the iframe route slug (e.g. "button"). The convention is that the
 * docs MDX uses `<ComponentPreview name="<slug>-demo" />` and the iframe
 * app registers a preview under `<slug>`.
 */
export function resolveIframeSlug(name: string): string | null {
  const slug = name.replace(/-demo$/, "")
  return IFRAME_PREVIEWS.has(slug) ? slug : null
}
