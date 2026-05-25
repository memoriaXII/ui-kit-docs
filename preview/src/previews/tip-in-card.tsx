import { Tip } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TipInCardPreview() {
  return (
    <PreviewLayout>
      <div
        style={{
          background: "var(--boxo-card-mobile-background, var(--fill-1))",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <Tip text="This balance is rounded to the nearest 10 points. Check your statement for exact values." />
      </div>
    </PreviewLayout>
  )
}
