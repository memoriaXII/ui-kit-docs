import { Info } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/elevenlabs-ui/ui/alert"

export default function TipDemo() {
  return (
    <Alert className="max-w-md">
      <Info />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can stack rewards from multiple partners on the same Boxo Pass.
      </AlertDescription>
    </Alert>
  )
}
