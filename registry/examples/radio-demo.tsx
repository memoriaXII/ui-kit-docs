import { Label } from "@/registry/ui/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/ui/ui/radio-group"

export default function RadioDemo() {
  return (
    <RadioGroup defaultValue="card">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card">Credit card</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal">PayPal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="apple" id="apple" />
        <Label htmlFor="apple">Apple Pay</Label>
      </div>
    </RadioGroup>
  )
}
