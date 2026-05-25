import { Label } from "@/registry/ui/ui/label"
import { Textarea } from "@/registry/ui/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." rows={4} />
    </div>
  )
}
