import { Layout, LayoutLoading } from "@appboxo/ui-kit"

export function LayoutLoadingDefaultPreview() {
  return (
    <Layout
      navBar={{ title: "Loading…" }}
      screenState={{ isLoading: true }}
      loadingNode={<LayoutLoading />}
    >
      <div />
    </Layout>
  )
}
