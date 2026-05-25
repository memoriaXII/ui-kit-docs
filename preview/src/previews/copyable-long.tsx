import { Body1, Card, Copyable } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CopyableLongPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Copyable text="ey0a73c4b8d2e1f5h6j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5">
          <Body1
            style={{
              fontFamily: "ui-monospace, monospace",
              wordBreak: "break-all",
            }}
          >
            ey0a73c4b8d2e1f5h6j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5
          </Body1>
        </Copyable>
      </Card>
    </PreviewLayout>
  )
}
