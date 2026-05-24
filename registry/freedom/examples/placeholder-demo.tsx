import { Ticket } from "lucide-react"

import { Button } from "@/registry/elevenlabs-ui/ui/button"

export default function PlaceholderDemo() {
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-3 text-center">
      <Ticket className="size-10 opacity-40" />
      <div>
        <div className="text-foreground text-sm font-medium">No tickets yet</div>
        <div className="text-xs">Your lounge passes will show up here.</div>
      </div>
      <Button size="sm">Browse lounges</Button>
    </div>
  )
}
