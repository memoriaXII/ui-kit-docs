import { Card, SummaryTable } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function SummaryTableLoyaltyPreview() {
  return (
    <PreviewLayout>
      <Card>
        <SummaryTable
          rows={[
            { label: "Starting balance", value: "12,480 pts" },
            { label: "Earned this month", value: "+1,200 pts" },
            { label: "Redeemed", value: "−800 pts" },
            { label: "Current balance", value: "12,880 pts", emphasised: true },
          ]}
        />
      </Card>
    </PreviewLayout>
  )
}
