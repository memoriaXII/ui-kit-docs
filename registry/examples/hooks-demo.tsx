export default function HooksDemo() {
  const hooks = [
    "useDevice",
    "useBreakpoint",
    "useDarkMode",
    "useSafeArea",
    "useScrollTop",
  ]
  return (
    <div className="text-muted-foreground flex flex-col gap-1 font-mono text-[11px]">
      {hooks.map((h) => (
        <span key={h}>{h}()</span>
      ))}
      <span className="opacity-50">+ 5 more</span>
    </div>
  )
}
