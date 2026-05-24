"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/elevenlabs-ui/ui/select"

export default function DialCodeSelectorDemo() {
  return (
    <Select defaultValue="+65">
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Country code" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="+65">🇸🇬 +65</SelectItem>
        <SelectItem value="+886">🇹🇼 +886</SelectItem>
        <SelectItem value="+1">🇺🇸 +1</SelectItem>
        <SelectItem value="+44">🇬🇧 +44</SelectItem>
        <SelectItem value="+852">🇭🇰 +852</SelectItem>
      </SelectContent>
    </Select>
  )
}
