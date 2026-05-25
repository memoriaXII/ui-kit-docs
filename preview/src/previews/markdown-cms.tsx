import { Markdown } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

// Typical shape of copy returned from a CMS or i18n catalog.
const CONTENT = `
### Lounge benefits

Each pass includes:

1. Unlimited buffet (hot + cold)
2. Wi-Fi up to **100 Mbps**
3. Showers (subject to availability)

If you arrive **less than 3 hours** before your flight, our staff will
help you fast-track to the gate.
`

export function MarkdownCmsPreview() {
  return (
    <PreviewLayout>
      <Markdown content={CONTENT} />
    </PreviewLayout>
  )
}
