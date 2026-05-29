import { Input } from "@/registry/ui/ui/input"
import { Label } from "@/registry/ui/ui/label"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}
