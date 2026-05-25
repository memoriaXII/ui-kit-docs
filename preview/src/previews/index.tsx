import { ButtonPreview } from "./button"
import { CardPreview } from "./card"
import { CheckboxPreview } from "./checkbox"
import { CopyablePreview } from "./copyable"
import { DatePickerPreview } from "./date-picker"
import { DialCodeSelectorPreview } from "./dial-code-selector"
import { DrawerPreview } from "./drawer"
import { FlexPreview } from "./flex"
import { InputPreview } from "./input"
import { PlaceholderPreview } from "./placeholder"
import { RadioPreview } from "./radio"
import { SearchBarPreview } from "./search-bar"
import { SummaryTablePreview } from "./summary-table"
import { TextareaPreview } from "./textarea"
import { TimePickerPreview } from "./time-picker"
import { TipPreview } from "./tip"
import { ToastPreview } from "./toast"
import { TouchCellPreview } from "./touch-cell"
import { TypographyPreview } from "./typography"

export const previews = {
  button: ButtonPreview,
  card: CardPreview,
  checkbox: CheckboxPreview,
  copyable: CopyablePreview,
  "date-picker": DatePickerPreview,
  "dial-code-selector": DialCodeSelectorPreview,
  drawer: DrawerPreview,
  flex: FlexPreview,
  input: InputPreview,
  placeholder: PlaceholderPreview,
  radio: RadioPreview,
  "search-bar": SearchBarPreview,
  "summary-table": SummaryTablePreview,
  textarea: TextareaPreview,
  "time-picker": TimePickerPreview,
  tip: TipPreview,
  toast: ToastPreview,
  "touch-cell": TouchCellPreview,
  typography: TypographyPreview,
} as const

export type PreviewName = keyof typeof previews
