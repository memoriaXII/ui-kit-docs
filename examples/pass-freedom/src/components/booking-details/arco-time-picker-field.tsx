import { useTranslation } from "next-i18next";
import { TimePicker } from "@arco-design/web-react";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/en";
import { Footnote1, Input, DownIcon } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { toDisplayTime } from "@/lib/booking-date-utils";

interface ArcoTimePickerFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
  onClearError?: () => void;
  helperText?: string;
}

/** Minutes only 00, 30 (match mobile esim-ui TimePicker) */
const MINUTE_STEP = 30;
const DISABLED_MINUTES: number[] = [];

export const ArcoTimePickerField = ({
  label,
  value,
  onChange,
  error,
  onClearError,
  helperText,
}: ArcoTimePickerFieldProps) => {
  const { t } = useTranslation();

  const dayjsValue = value ? dayjs(value).locale("en") : undefined;

  const handleChange = (_dateString: string, date: Dayjs) => {
    onChange(date.valueOf());
  };

  const handleTriggerClick = () => {
    addHapticFeedback("light");
    onClearError?.();
  };

  return (
    <div className="desktop-time-picker-field flex flex-col gap-[8px]">
      <Footnote1>{label}</Footnote1>
      <TimePicker
        format="HH:mm"
        value={dayjsValue}
        onChange={handleChange}
        allowClear
        use12Hours={false}
        onClear={() => onClearError?.()}
        scrollSticky={false}
        step={{ minute: MINUTE_STEP }}
        disabledMinutes={() => DISABLED_MINUTES}
        disableConfirm
        showNowBtn={false}
        getPopupContainer={(node) => node.parentElement ?? document.body}
        triggerElement={
          <Input
            readOnly
            value={value != null ? toDisplayTime(value) : ""}
            placeholder={t("Select time")}
            suffix={<DownIcon />}
            hasError={!!error}
            className="picker-trigger-input"
            onClick={handleTriggerClick}
          />
        }
      />
      {helperText && (
        <Footnote1 className="text-text-3">{helperText}</Footnote1>
      )}
      {error && <Footnote1 className="text-danger-6">{error}</Footnote1>}
    </div>
  );
};
