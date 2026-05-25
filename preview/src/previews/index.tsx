// Each preview is mounted at /<slug> in the preview app and iframed
// into the docs site via <ComponentPreview name="<slug>" />. Adding a
// new variant = drop a *.tsx in this folder, re-export it from the
// matching umbrella file, and register it here + in lib/iframe-previews.ts.

import {
  ButtonDisabledPreview,
  ButtonLinkPreview,
  ButtonLoadingPreview,
  ButtonPreview,
  ButtonVariantsPreview,
} from "./button"
import {
  CardDefaultPreview,
  CardFormPreview,
  CardPreview,
  CardSelectablePreview,
  CardStatPreview,
} from "./card"
import {
  CheckboxDisabledPreview,
  CheckboxOutlinePreview,
  CheckboxPreview,
  CheckboxSolidPreview,
} from "./checkbox"
import { CopyableInlinePreview, CopyableLongPreview, CopyablePreview } from "./copyable"
import { DatePickerPreview } from "./date-picker"
import { DialCodeSelectorPreview } from "./dial-code-selector"
import {
  DrawerConfirmPreview,
  DrawerDetailsPreview,
  DrawerNoHandlePreview,
  DrawerPreview,
} from "./drawer"
import {
  FlexBetweenPreview,
  FlexCenteredPreview,
  FlexHorizontalPreview,
  FlexPreview,
  FlexVerticalPreview,
} from "./flex"
import { FooterDefaultPreview, FooterPreview, FooterSinglePreview } from "./footer"
import {
  InputDefaultPreview,
  InputDisabledPreview,
  InputErrorPreview,
  InputFilledPreview,
  InputPreview,
} from "./input"
import { LayoutDefaultPreview, LayoutLoadingDefaultPreview, LayoutPreview } from "./layout"
import { LayoutLoadingStandalonePreview } from "./layout-loading-standalone"
import { MarkdownCmsPreview, MarkdownDefaultPreview, MarkdownPreview } from "./markdown"
import {
  PickerInputDefaultPreview,
  PickerInputErrorPreview,
  PickerInputPreview,
} from "./picker-input"
import {
  PlaceholderFullPreview,
  PlaceholderPreview,
  PlaceholderTitleOnlyPreview,
} from "./placeholder"
import { PopupSwiperDefaultPreview, PopupSwiperPreview } from "./popup-swiper"
import { RadioGroupPreview, RadioPreview, RadioStandalonePreview } from "./radio"
import { ResponsiveLayoutDefaultPreview, ResponsiveLayoutPreview } from "./responsive-layout"
import {
  SearchBarEmptyPreview,
  SearchBarFilledPreview,
  SearchBarPreview,
} from "./search-bar"
import {
  SummaryTableLoyaltyPreview,
  SummaryTableOrderPreview,
  SummaryTablePreview,
} from "./summary-table"
import {
  TextareaDefaultPreview,
  TextareaDisabledPreview,
  TextareaErrorPreview,
  TextareaFilledPreview,
  TextareaPreview,
} from "./textarea"
import {
  TimePicker12hPreview,
  TimePicker24hPreview,
  TimePickerPreview,
} from "./time-picker"
import {
  TipDefaultPreview,
  TipEmphasisPreview,
  TipInCardPreview,
  TipPreview,
} from "./tip"
import { ToastErrorPreview, ToastInfoPreview, ToastPreview } from "./toast"
import {
  TouchCellDescPreview,
  TouchCellPlainPreview,
  TouchCellPreview,
  TouchCellTrailingPreview,
} from "./touch-cell"
import {
  TypographyColorsPreview,
  TypographyPreview,
  TypographyScalePreview,
  TypographyWeightsPreview,
} from "./typography"

export const previews = {
  // Button
  button: ButtonPreview,
  "button-variants": ButtonVariantsPreview,
  "button-link": ButtonLinkPreview,
  "button-disabled": ButtonDisabledPreview,
  "button-loading": ButtonLoadingPreview,

  // Card
  card: CardPreview,
  "card-default": CardDefaultPreview,
  "card-stat": CardStatPreview,
  "card-selectable": CardSelectablePreview,
  "card-form": CardFormPreview,

  // Checkbox
  checkbox: CheckboxPreview,
  "checkbox-solid": CheckboxSolidPreview,
  "checkbox-outline": CheckboxOutlinePreview,
  "checkbox-disabled": CheckboxDisabledPreview,

  // Copyable
  copyable: CopyablePreview,
  "copyable-inline": CopyableInlinePreview,
  "copyable-long": CopyableLongPreview,

  // Pickers
  "date-picker": DatePickerPreview,
  "dial-code-selector": DialCodeSelectorPreview,

  // Drawer
  drawer: DrawerPreview,
  "drawer-confirm": DrawerConfirmPreview,
  "drawer-details": DrawerDetailsPreview,
  "drawer-no-handle": DrawerNoHandlePreview,

  // Flex
  flex: FlexPreview,
  "flex-vertical": FlexVerticalPreview,
  "flex-horizontal": FlexHorizontalPreview,
  "flex-between": FlexBetweenPreview,
  "flex-centered": FlexCenteredPreview,

  // Footer
  footer: FooterPreview,
  "footer-default": FooterDefaultPreview,
  "footer-single": FooterSinglePreview,

  // Input
  input: InputPreview,
  "input-default": InputDefaultPreview,
  "input-filled": InputFilledPreview,
  "input-error": InputErrorPreview,
  "input-disabled": InputDisabledPreview,

  // Layout shells
  layout: LayoutPreview,
  "layout-default": LayoutDefaultPreview,
  "layout-loading": LayoutLoadingDefaultPreview,
  "layout-loading-standalone": LayoutLoadingStandalonePreview,
  "responsive-layout": ResponsiveLayoutPreview,
  "responsive-layout-default": ResponsiveLayoutDefaultPreview,

  // Markdown
  markdown: MarkdownPreview,
  "markdown-default": MarkdownDefaultPreview,
  "markdown-cms": MarkdownCmsPreview,

  // PickerInput
  "picker-input": PickerInputPreview,
  "picker-input-default": PickerInputDefaultPreview,
  "picker-input-error": PickerInputErrorPreview,

  // Placeholder
  placeholder: PlaceholderPreview,
  "placeholder-full": PlaceholderFullPreview,
  "placeholder-title-only": PlaceholderTitleOnlyPreview,

  // PopupSwiper
  "popup-swiper": PopupSwiperPreview,
  "popup-swiper-default": PopupSwiperDefaultPreview,

  // Radio
  radio: RadioPreview,
  "radio-standalone": RadioStandalonePreview,
  "radio-group": RadioGroupPreview,

  // SearchBar
  "search-bar": SearchBarPreview,
  "search-bar-empty": SearchBarEmptyPreview,
  "search-bar-filled": SearchBarFilledPreview,

  // SummaryTable
  "summary-table": SummaryTablePreview,
  "summary-table-order": SummaryTableOrderPreview,
  "summary-table-loyalty": SummaryTableLoyaltyPreview,

  // Textarea
  textarea: TextareaPreview,
  "textarea-default": TextareaDefaultPreview,
  "textarea-filled": TextareaFilledPreview,
  "textarea-error": TextareaErrorPreview,
  "textarea-disabled": TextareaDisabledPreview,

  // TimePicker
  "time-picker": TimePickerPreview,
  "time-picker-12h": TimePicker12hPreview,
  "time-picker-24h": TimePicker24hPreview,

  // Tip
  tip: TipPreview,
  "tip-default": TipDefaultPreview,
  "tip-emphasis": TipEmphasisPreview,
  "tip-in-card": TipInCardPreview,

  // Toast
  toast: ToastPreview,
  "toast-info": ToastInfoPreview,
  "toast-error": ToastErrorPreview,

  // TouchCell
  "touch-cell": TouchCellPreview,
  "touch-cell-plain": TouchCellPlainPreview,
  "touch-cell-desc": TouchCellDescPreview,
  "touch-cell-trailing": TouchCellTrailingPreview,

  // Typography
  typography: TypographyPreview,
  "typography-scale": TypographyScalePreview,
  "typography-colors": TypographyColorsPreview,
  "typography-weights": TypographyWeightsPreview,
} as const

export type PreviewName = keyof typeof previews
