"use client"

import { CalendarIcon } from "lucide-react"

import { Button } from "@/registry/elevenlabs-ui/ui/button"

export default function DatePickerDemo() {
  return (
    <Button variant="outline" className="w-[240px] justify-start">
      <CalendarIcon className="size-4" />
      <span>Pick a date</span>
    </Button>
  )
}
