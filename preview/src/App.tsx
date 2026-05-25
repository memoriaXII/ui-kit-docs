import { examplePreviews, type ExamplePreviewName } from "./examples"
import { previews, type PreviewName } from "./previews"

export function App() {
  const segments = window.location.pathname.split("/").filter(Boolean)

  // /example/<slug> → full example screen (App.tsx port from
  // examples/<slug>/src/App.tsx, rendered inside the same ContextProvider
  // + UIKitProvider that wraps the rest of the preview app).
  if (segments[0] === "example") {
    const slug = (segments[1] ?? "") as ExamplePreviewName
    const Preview = examplePreviews[slug]
    return (
      <div className="preview-wrapper">
        {Preview ? (
          <Preview />
        ) : (
          <Empty
            label={`example: ${slug || "(empty)"}`}
            available={Object.keys(examplePreviews)}
          />
        )}
      </div>
    )
  }

  // /<name> → single-component preview (one component from @appboxo/ui-kit,
  // used in <ComponentPreview iframe slug="…" /> on the docs site).
  const name = (segments[segments.length - 1] ?? "") as PreviewName
  const Preview = previews[name]
  return (
    <div className="preview-wrapper">
      {Preview ? (
        <Preview />
      ) : (
        <Empty label={name || "(empty)"} available={Object.keys(previews)} />
      )}
    </div>
  )
}

/**
 * Renders when a slug isn't registered. Includes the list of known slugs
 * so a missing-preview reads as a build-out hint rather than an opaque
 * 404 — typically means the preview project hasn't redeployed yet, or
 * the iframe's bundle is stale (hard refresh).
 */
function Empty({
  label,
  available,
}: {
  label: string
  available: string[]
}) {
  return (
    <div
      style={{
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 13,
        color: "#374151",
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        No preview registered for <code>{label}</code>
      </div>
      <div style={{ color: "#6b7280", marginBottom: 12 }}>
        The preview app build doesn&apos;t include this slug yet. Either the
        Vercel preview project is still redeploying, or your browser cached
        an older bundle — try a hard refresh.
      </div>
      <details style={{ color: "#6b7280" }}>
        <summary style={{ cursor: "pointer" }}>
          Available slugs ({available.length})
        </summary>
        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 4,
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
          }}
        >
          {available.sort().map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </details>
    </div>
  )
}
