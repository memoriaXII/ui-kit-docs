export default function TypographyDemo() {
  return (
    <div className="flex flex-col items-start gap-1.5 text-foreground">
      <div className="text-3xl font-bold leading-tight">Large title</div>
      <div className="text-2xl font-semibold">Title 1</div>
      <div className="text-lg font-semibold">Title 2 / 3</div>
      <div className="text-base">Body 1 / Body 2 — quick brown fox.</div>
      <div className="text-xs text-muted-foreground">Footnote — supporting copy</div>
    </div>
  )
}
