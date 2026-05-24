"use client"

import { Copy } from "lucide-react"

export default function CopyableDemo() {
  return (
    <button
      onClick={() => navigator.clipboard?.writeText("boxo-ABCD-1234")}
      className="hover:bg-muted/50 inline-flex items-center gap-2 rounded-md border border-dashed px-3 py-1.5 font-mono text-sm transition-colors"
    >
      boxo-ABCD-1234
      <Copy className="text-muted-foreground size-3.5" />
    </button>
  )
}
