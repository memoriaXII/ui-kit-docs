import { Button } from "@/registry/elevenlabs-ui/ui/button"

export default function FooterDemo() {
  return (
    <div className="border-border/60 bg-muted/30 flex w-56 items-center gap-2 rounded-md border-t-2 px-3 py-3 shadow-[0_-4px_12px_-8px_rgba(0,0,0,0.15)]">
      <Button className="flex-1" size="sm">
        Confirm
      </Button>
      <Button variant="ghost" size="sm">
        Cancel
      </Button>
    </div>
  )
}
