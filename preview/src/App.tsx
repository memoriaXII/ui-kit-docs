import { previews, type PreviewName } from "./previews"

export function App() {
  // Path looks like `/preview/button`. Pluck the last segment.
  const segments = window.location.pathname.split("/").filter(Boolean)
  const name = (segments[segments.length - 1] ?? "") as PreviewName
  const Preview = previews[name]

  return (
    <div className="preview-wrapper">
      {Preview ? (
        <Preview />
      ) : (
        <div style={{ padding: 16, color: "#888", fontSize: 12 }}>
          No preview registered for <code>{name || "(empty)"}</code>.
        </div>
      )}
    </div>
  )
}
