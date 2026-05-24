"use client"

import { Clock } from "lucide-react"

import { Button } from "@/registry/elevenlabs-ui/ui/button"

export default function TimePickerDemo() {
  return (
    <Button variant="outline" className="w-[160px] justify-start">
      <Clock className="size-4" />
      <span>09:30 AM</span>
    </Button>
  )
}
