"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { PREVIEW_ORIGIN } from "@/lib/iframe-previews"
import { useBrand } from "@/components/brand-context"

type Props = {
  slug: string
  /** Tailwind classes for the iframe wrapper. */
  className?: string
}

/**
 * Renders the sibling Vite preview app inside an iframe. Theme (dark/light)
 * and active brand are synced via postMessage so the iframe re-renders
 * whenever the docs site brand switcher or theme toggle fires.
 *
 * The iframe is *isolated* from the docs site: Tailwind 4 resets stay out,
 * Arco's 50px root font-size stays in, and the kit's `#root`-scoped tokens
 * apply without colliding with the docs chrome.
 */
export function IframePreview({ slug, className }: Props) {
  const { brand } = useBrand()
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  const ref = React.useRef<HTMLIFrameElement | null>(null)

  // Initial src embeds brand + dark for the first paint so we don't have to
  // wait for postMessage to arrive after mount.
  const src = `${PREVIEW_ORIGIN}/${slug}?brand=${encodeURIComponent(
    brand
  )}&dark=${dark}`

  // After mount, keep the iframe in sync via postMessage. Re-rendering
  // src would force a full reload and lose interactive state.
  React.useEffect(() => {
    const win = ref.current?.contentWindow
    if (!win) return
    win.postMessage(
      { type: "freedom-preview:update", brand, dark },
      PREVIEW_ORIGIN
    )
  }, [brand, dark])

  return (
    <iframe
      ref={ref}
      src={src}
      title={`Preview of ${slug}`}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        border: 0,
        background: "transparent",
        display: "block",
      }}
      // Component previews are static demo screens — no top navigation
      // or popups should escape the iframe.
      sandbox="allow-scripts allow-same-origin allow-popups"
      loading="lazy"
    />
  )
}
