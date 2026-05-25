import { BasicAppExample } from "./basic-app"
import { FreedomThemeExample } from "./freedom-theme"
import { KitchenSinkExample } from "./kitchen-sink"

export const examplePreviews = {
  "basic-app": BasicAppExample,
  "freedom-theme": FreedomThemeExample,
  "kitchen-sink": KitchenSinkExample,
} as const

export type ExamplePreviewName = keyof typeof examplePreviews
