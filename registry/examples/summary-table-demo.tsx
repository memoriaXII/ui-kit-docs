export default function SummaryTableDemo() {
  const rows = [
    { label: "Subtotal", value: "$120.00" },
    { label: "Tax", value: "$9.60" },
    { label: "Total", value: "$129.60", emphasised: true },
  ]
  return (
    <div className="w-full max-w-sm divide-y rounded-md border">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between px-3 py-2.5 text-sm"
        >
          <span className={row.emphasised ? "font-semibold" : "text-muted-foreground"}>
            {row.label}
          </span>
          <span className={row.emphasised ? "font-semibold" : ""}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}
