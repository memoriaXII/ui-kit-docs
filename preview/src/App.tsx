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
          <Empty label={`example: ${slug || "(empty)"}`} />
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
      {Preview ? <Preview /> : <Empty label={name || "(empty)"} />}
    </div>
  )
}

function Empty({ label }: { label: string }) {
  return (
    <div style={{ padding: 16, color: "#888", fontSize: 12 }}>
      No preview registered for <code>{label}</code>.
    </div>
  )
}
