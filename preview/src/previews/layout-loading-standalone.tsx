import { LayoutLoading } from "@appboxo/ui-kit"

export function LayoutLoadingStandalonePreview() {
  return (
    <div
      style={{
        background: "var(--fill-white)",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LayoutLoading />
    </div>
  )
}
