/**
 * Component names that have a real `@appboxo/ui-kit` preview implemented in
 * the sibling Vite app (`preview/src/previews/*`). When ComponentPreview's
 * `name` matches one of these we render an iframe pointing at the preview
 * app instead of the shadcn-placeholder Index demo.
 *
 * The preview app routes are keyed by the same string, e.g. `button` -> a
 * `<ButtonPreview />` mounted under Arco's ContextProvider + UIKitProvider.
 *
 * Sub-variant slugs like `button-disabled` live alongside the umbrella
 * `button` slug — each MDX section drives its own dedicated iframe.
 */
export const IFRAME_PREVIEWS = new Set<string>([
  // Button
  "button",
  "button-variants",
  "button-link",
  "button-disabled",
  "button-loading",
  // Card
  "card",
  "card-default",
  "card-stat",
  "card-selectable",
  "card-form",
  // Checkbox
  "checkbox",
  "checkbox-solid",
  "checkbox-outline",
  "checkbox-disabled",
  // Copyable
  "copyable",
  "copyable-inline",
  "copyable-long",
  // Pickers
  "date-picker",
  "dial-code-selector",
  // Drawer
  "drawer",
  "drawer-confirm",
  "drawer-details",
  "drawer-no-handle",
  // Flex
  "flex",
  "flex-vertical",
  "flex-horizontal",
  "flex-between",
  "flex-centered",
  // Footer
  "footer",
  "footer-default",
  "footer-single",
  // Input
  "input",
  "input-default",
  "input-filled",
  "input-error",
  "input-disabled",
  // Layout shells
  "layout",
  "layout-default",
  "layout-loading",
  "layout-loading-standalone",
  "responsive-layout",
  "responsive-layout-default",
  // Markdown
  "markdown",
  "markdown-default",
  "markdown-cms",
  // PickerInput
  "picker-input",
  "picker-input-default",
  "picker-input-error",
  // Placeholder
  "placeholder",
  "placeholder-full",
  "placeholder-title-only",
  // PopupSwiper
  "popup-swiper",
  "popup-swiper-default",
  // Radio
  "radio",
  "radio-standalone",
  "radio-group",
  // SearchBar
  "search-bar",
  "search-bar-empty",
  "search-bar-filled",
  // SummaryTable
  "summary-table",
  "summary-table-order",
  "summary-table-loyalty",
  // Textarea
  "textarea",
  "textarea-default",
  "textarea-filled",
  "textarea-error",
  "textarea-disabled",
  // TimePicker
  "time-picker",
  "time-picker-12h",
  "time-picker-24h",
  // Tip
  "tip",
  "tip-default",
  "tip-emphasis",
  "tip-in-card",
  // Toast
  "toast",
  "toast-info",
  "toast-error",
  // TouchCell
  "touch-cell",
  "touch-cell-plain",
  "touch-cell-desc",
  "touch-cell-trailing",
  // Typography
  "typography",
  "typography-scale",
  "typography-colors",
  "typography-weights",
])

export const PREVIEW_ORIGIN =
  process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? "http://127.0.0.1:4001"

/**
 * Given the `name` prop on <ComponentPreview /> (e.g. "button-variants" or
 * the legacy "button-demo"), resolve the iframe route slug.
 */
export function resolveIframeSlug(name: string): string | null {
  if (IFRAME_PREVIEWS.has(name)) return name
  // Backwards-compat: the landing page MDX still uses `-demo` suffixes
  // from the earlier pattern. Strip and retry.
  const stripped = name.replace(/-demo$/, "")
  return IFRAME_PREVIEWS.has(stripped) ? stripped : null
}
