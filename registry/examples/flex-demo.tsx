import { Button } from "@/registry/ui/ui/button"

export default function FlexDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base">Welcome</div>
      <div className="flex gap-2">
        <Button>Continue</Button>
        <Button variant="secondary">Skip</Button>
      </div>
    </div>
  )
}
