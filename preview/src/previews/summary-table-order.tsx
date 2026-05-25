import { Card, SummaryTable } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function SummaryTableOrderPreview() {
  return (
    <PreviewLayout>
      <Card>
        <SummaryTable
          rows={[
            { label: "Subtotal", value: "$120.00" },
            { label: "Discount", value: "−$12.00" },
            { label: "Tax", value: "$9.60" },
            { label: "Total", value: "$117.60", emphasised: true },
          ]}
        />
      </Card>
    </PreviewLayout>
  )
}
