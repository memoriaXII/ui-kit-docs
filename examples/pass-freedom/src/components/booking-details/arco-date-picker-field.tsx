import { useTranslation } from "next-i18next";
import { DatePicker } from "@arco-design/web-react";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/en";
import { Footnote1, Input, DownIcon } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { toDisplayDate } from "@/lib/booking-date-utils";
import { arcoLocaleEn } from "@/lib/arco-locale-en";

interface ArcoDatePickerFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  minDateTime: number;
  maxDateTime: number;
  error?: string;
  onClearError?: () => void;
}

export const ArcoDatePickerField = ({
  label,
  value,
  onChange,
  minDateTime,
  maxDateTime,
  error,
  onClearError,
}: ArcoDatePickerFieldProps) => {
  const { t } = useTranslation();

  const dayjsValue = value ? dayjs(value).locale("en") : undefined;
  const minDay = dayjs(minDateTime).startOf("day");
  const maxDay = dayjs(maxDateTime).startOf("day");

  const handleChange = (_dateString: string, date: Dayjs) => {
    onChange(date.valueOf());
  };

  const handleVisibleChange = (visible?: boolean) => {
    if (visible) {
      addHapticFeedback("light");
      onClearError?.();
    }
  };

  const disabledDate = (current: Dayjs) => {
    const d = current.startOf("day");
    return d.isBefore(minDay) || d.isAfter(maxDay);
  };

  return (
    <div className="desktop-date-picker-field flex flex-col gap-[8px]">
      <Footnote1>{label}</Footnote1>
      <DatePicker
        format="DD MMM YYYY"
        value={dayjsValue}
        onChange={handleChange}
        onVisibleChange={handleVisibleChange}
        disabledDate={disabledDate}
        allowClear
        onClear={() => onClearError?.()}
        locale={arcoLocaleEn.DatePicker}
        getPopupContainer={(node) => node.parentElement ?? document.body}
        triggerElement={
          <Input
            readOnly
            value={value ? toDisplayDate(value) : ""}
            placeholder={t("Select date")}
            suffix={<DownIcon />}
            hasError={!!error}
            className="picker-trigger-input"
          />
        }
      />
      {error && <Footnote1 className="text-danger-6">{error}</Footnote1>}
    </div>
  );
};
