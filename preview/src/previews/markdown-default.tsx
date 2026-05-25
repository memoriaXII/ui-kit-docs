import { Markdown } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

const CONTENT = `
## Terms of service

By tapping continue you agree to our **terms** and [privacy policy](#).

### What we collect

- Your name and email
- Booking history
- Device identifiers (for fraud prevention)

Points expire after **12 months** of inactivity. Redemptions are final.
`

export function MarkdownDefaultPreview() {
  return (
    <PreviewLayout>
      <Markdown content={CONTENT} />
    </PreviewLayout>
  )
}
