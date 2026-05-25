import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { Select } from "@arco-design/web-react";
import { getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import {
  Footnote1,
  Input,
  SearchBar,
  DownIcon,
  type CountryData,
} from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";

export interface DialCodeOption {
  value: string;
  label: string;
  flag: string;
  name: string;
}

function buildDialCodeOptions(
  data: Record<string, CountryData>,
): DialCodeOption[] {
  const result: DialCodeOption[] = [];

  for (const code of Object.keys(data)) {
    const countryData = data[code];
    if (!countryData) continue;

    try {
      const callingCode = getCountryCallingCode(code as CountryCode);
      const value = `+${callingCode}`;
      result.push({
        value,
        label: `${countryData.name} (+${callingCode})`,
        flag: countryData.flag,
        name: countryData.name,
      });
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export interface ArcoDialCodeSelectProps {
  label: string;
  value: string;
  onChange: (dialCode: string) => void;
  countriesData: Record<string, CountryData>;
  error?: string;
  onClearError?: () => void;
}

export const ArcoDialCodeSelect = ({
  label,
  value,
  onChange,
  countriesData,
  error,
  onClearError,
}: ArcoDialCodeSelectProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const dialCodeOptions = useMemo(
    () => buildDialCodeOptions(countriesData),
    [countriesData],
  );

  const selectOptions = useMemo(
    () =>
      dialCodeOptions.map((opt) => ({
        value: opt.value,
        label: (
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- country flags from API, dynamic external URLs */}
            <img
              src={opt.flag}
              alt=""
              width={20}
              height={20}
              className="rounded-sm object-cover shrink-0"
            />
            <span>
              +{opt.value.replace("+", "")} {opt.name}
            </span>
          </span>
        ),
        extra: {
          flag: opt.flag,
          searchText:
            `${opt.name} ${opt.value} ${opt.value.replace("+", "")}`.toLowerCase(),
        },
      })),
    [dialCodeOptions],
  );

  const filterOption = useMemo(
    () =>
      (
        inputValue: string,
        option: { props?: { value?: string; extra?: { searchText?: string } } },
      ) => {
        if (!inputValue) return true;
        const searchText =
          option.props?.extra?.searchText ??
          String(option.props?.value ?? "").toLowerCase();
        return searchText.includes(inputValue.toLowerCase());
      },
    [],
  );

  const handleTriggerClick = () => {
    addHapticFeedback("light");
    onClearError?.();
  };

  return (
    <div className="desktop-dial-code-select flex flex-col gap-[8px] w-[100px]">
      <Footnote1>{label}</Footnote1>
      <Select
        value={value || undefined}
        onChange={(v) => {
          addHapticFeedback("light");
          onClearError?.();
          onChange(v as string);
        }}
        options={selectOptions}
        placeholder="+"
        allowClear={false}
        showSearch
        inputValue={searchValue}
        onInputValueChange={(v) => setSearchValue(v ?? "")}
        onVisibleChange={(visible) => {
          if (!visible) setSearchValue("");
        }}
        filterOption={filterOption}
        notFoundContent={
          <div className="py-3 px-4 text-center text-[var(--text-3)]">
            {t("No results found, try a different search term.")}
          </div>
        }
        triggerProps={{
          autoAlignPopupWidth: false,
          position: "bl",
        }}
        getPopupContainer={(node) => node.parentElement ?? document.body}
        dropdownRender={(menu) => (
          <div
            className="flex flex-col"
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="dial-code-select-search-wrap p-[8px] border-b border-half">
              <SearchBar
                actionButton={null}
                placeholder={t("Search")}
                value={searchValue}
                onClear={() => setSearchValue("")}
                onInput={(_, value) => setSearchValue(value)}
              />
            </div>
            <div className="max-h-[360px] overflow-y-auto mt-0.5">{menu}</div>
          </div>
        )}
        triggerElement={
          <Input
            readOnly
            value={value || ""}
            placeholder="+"
            suffix={<DownIcon />}
            hasError={!!error}
            className="picker-trigger-input"
            onClick={handleTriggerClick}
          />
        }
      />
      {error && <Footnote1 className="text-danger-6">{error}</Footnote1>}
    </div>
  );
};
