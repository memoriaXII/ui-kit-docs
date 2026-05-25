import { Card, SummaryTable } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function SummaryTablePreview() {
  return (
    <PreviewLayout>
      <Section
        title="Order summary"
        description="emphasised on the total line keeps the eye where it belongs."
      >
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
      </Section>

      <Section
        title="Loyalty breakdown"
        description="Points / cashback / discounts."
      >
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
      </Section>
    </PreviewLayout>
  )
}
