import { ButtonPreview } from "./button"
import { CardPreview } from "./card"
import { CheckboxPreview } from "./checkbox"
import { CopyablePreview } from "./copyable"
import { DrawerPreview } from "./drawer"
import { FlexPreview } from "./flex"
import { InputPreview } from "./input"
import { RadioPreview } from "./radio"
import { SearchBarPreview } from "./search-bar"
import { TextareaPreview } from "./textarea"
import { TipPreview } from "./tip"
import { ToastPreview } from "./toast"
import { TypographyPreview } from "./typography"

export const previews = {
  button: ButtonPreview,
  card: CardPreview,
  checkbox: CheckboxPreview,
  copyable: CopyablePreview,
  drawer: DrawerPreview,
  flex: FlexPreview,
  input: InputPreview,
  radio: RadioPreview,
  "search-bar": SearchBarPreview,
  textarea: TextareaPreview,
  tip: TipPreview,
  toast: ToastPreview,
  typography: TypographyPreview,
} as const

export type PreviewName = keyof typeof previews
