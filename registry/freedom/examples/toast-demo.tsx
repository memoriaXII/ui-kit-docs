"use client"

import { toast } from "sonner"

import { Button } from "@/registry/elevenlabs-ui/ui/button"

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Saved", {
          description: "Your changes have been saved successfully.",
        })
      }
    >
      Show toast
    </Button>
  )
}
