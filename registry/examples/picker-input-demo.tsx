"use client"

import { ChevronDown } from "lucide-react"

export default function PickerInputDemo() {
  return (
    <button className="hover:bg-muted/50 flex w-44 items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors">
      <span className="text-muted-foreground">Theme</span>
      <span className="flex items-center gap-1.5 font-medium">
        Light
        <ChevronDown className="size-3.5 opacity-60" />
      </span>
    </button>
  )
}
