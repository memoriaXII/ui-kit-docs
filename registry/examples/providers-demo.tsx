import { Layers } from "lucide-react"

export default function ProvidersDemo() {
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-1.5 text-center">
      <Layers className="text-foreground/70 size-7" />
      <div className="text-foreground text-xs font-medium">UIKitProvider</div>
      <div className="font-mono text-[10px]">router · link · t()</div>
    </div>
  )
}
