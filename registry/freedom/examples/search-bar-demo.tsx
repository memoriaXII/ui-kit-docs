import { Search } from "lucide-react"

import { Input } from "@/registry/elevenlabs-ui/ui/input"

export default function SearchBarDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
      <Input
        type="search"
        placeholder="Search rewards, stores, brands…"
        className="pl-9"
      />
    </div>
  )
}
