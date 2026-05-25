import { Loader2 } from "lucide-react"

export default function LayoutLoadingDemo() {
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-2">
      <Loader2 className="text-foreground/60 size-6 animate-spin" />
      <span className="text-xs">Loading…</span>
    </div>
  )
}
