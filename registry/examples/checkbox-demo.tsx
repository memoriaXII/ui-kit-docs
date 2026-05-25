import { Checkbox } from "@/registry/ui/ui/checkbox"
import { Label } from "@/registry/ui/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
