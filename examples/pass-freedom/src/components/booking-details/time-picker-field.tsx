import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Footnote1, Input, TimePicker, DownIcon } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { toDisplayTime } from "@/lib/booking-date-utils";

interface TimePickerFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
  onClearError?: () => void;
  helperText?: string;
}

export const TimePickerField = ({
  label,
  value,
  onChange,
  error,
  onClearError,
  helperText,
}: TimePickerFieldProps) => {
  const { t } = useTranslation();
  const [showPicker, setShowPicker] = useState(false);

  const handleInputClick = () => {
    addHapticFeedback("light");
    onClearError?.();
    setShowPicker(true);
  };

  const handlePickerOk = (timestamp: number) => {
    onChange(timestamp);
    setShowPicker(false);
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <Footnote1 className="text-text-5">{label}</Footnote1>
      <Input
        readOnly
        value={value ? toDisplayTime(value) : ""}
        placeholder={t("Select time")}
        suffix={<DownIcon />}
        hasError={!!error}
        onClick={handleInputClick}
        className="mobile-picker-field mobile-time-picker-field"
      />
      {helperText && (
        <Footnote1 className="text-text-3">{helperText}</Footnote1>
      )}
      {error && <Footnote1 className="text-danger-6">{error}</Footnote1>}
      <TimePicker
        visible={showPicker}
        onHide={() => setShowPicker(false)}
        onOk={handlePickerOk}
        value={value}
        title={label}
        hourFormat="24h"
      />
    </div>
  );
};
