import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Footnote1, Input, DatePicker, DownIcon } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { toDisplayDate } from "@/lib/booking-date-utils";

interface DatePickerFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  minDateTime: number;
  maxDateTime: number;
  error?: string;
  onClearError?: () => void;
}

export const DatePickerField = ({
  label,
  value,
  onChange,
  minDateTime,
  maxDateTime,
  error,
  onClearError,
}: DatePickerFieldProps) => {
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
        value={value ? toDisplayDate(value) : ""}
        placeholder={t("Select date")}
        suffix={<DownIcon />}
        hasError={!!error}
        onClick={handleInputClick}
        className="mobile-picker-field mobile-date-picker-field"
      />
      {error && <Footnote1 className="text-danger-6">{error}</Footnote1>}
      <DatePicker
        visible={showPicker}
        onHide={() => setShowPicker(false)}
        onOk={handlePickerOk}
        value={value}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        title={label}
      />
    </div>
  );
};
