import { Layout, LayoutLoading } from "@appboxo/ui-kit"

export function LayoutLoadingDefaultPreview() {
  return (
    <div
      style={{
        background: "var(--fill-2)",
        minHeight: "100%",
        padding: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 320,
          height: 560,
          background: "var(--fill-white)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.18)",
          border: "1px solid var(--line-1)",
        }}
      >
        <Layout
          navBar={{ title: "Loading…" }}
          screenState={{ isLoading: true }}
          loadingNode={<LayoutLoading />}
        >
          <div />
        </Layout>
      </div>
    </div>
  )
}
