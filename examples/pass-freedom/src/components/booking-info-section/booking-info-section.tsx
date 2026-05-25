import { useTranslation } from "next-i18next";
import { Body1, Body2 } from "@appboxo/ui-kit";
import { cls } from "@arco-design/mobile-utils";
import Link from "next/link";
import { formatBookingDateTime, getAirportInfo } from "@/lib/quote-utils";
import type { Quote } from "@boxo/api/lounge";
import ClockIcon from "@/assets/icons/clock.svg";
import UserIcon from "@/assets/icons/user.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import { ParsedUrlQueryInput } from "querystring";

interface BookingInfoRowProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  isLoading?: boolean;
  rightContent?: React.ReactNode;
}

const BookingInfoRow = ({
  icon,
  label,
  value,
  isLoading,
  rightContent,
}: BookingInfoRowProps) => {
  return (
    <div className="flex items-center gap-[12px] py-[8px]">
      {icon && (
        <div className="flex items-center justify-center w-[24px] h-[24px]">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-[2px] flex-1">
        {isLoading && !label ? (
          <div className="h-[20px] flex items-center">
            <div className="w-[240px] h-[12px] rounded-full bg-fill-2" />
          </div>
        ) : (
          <Body1 weight="semibold">{label}</Body1>
        )}
        {isLoading ? (
          <div className="h-[20px] flex items-center">
            <div className="w-[140px] h-[12px] rounded-full bg-fill-2" />
          </div>
        ) : (
          value && <Body2 className="text-text-4">{value}</Body2>
        )}
      </div>
      {rightContent}
    </div>
  );
};

interface BookingInfoSectionProps {
  quote?: Quote | null;
  isLoading?: boolean;
  /** When true, Access Window and Travelers rows are clickable links */
  editable?: boolean;
  /** Query params to pass to the edit links (required when editable is true) */
  routerQuery?: ParsedUrlQueryInput;
  className?: string;
}

export const BookingInfoSection = ({
  quote,
  isLoading,
  editable = false,
  routerQuery,
  className,
}: BookingInfoSectionProps) => {
  const { t } = useTranslation();

  const airportInfo = getAirportInfo(quote);
  const formattedDateTime = formatBookingDateTime(quote);
  const travelerCount = quote?.passenger_count || 0;
  const travelersText =
    travelerCount === 1
      ? t("1 traveler")
      : t("{{count}} travelers", { count: travelerCount });

  const accessWindowRow = (
    <BookingInfoRow
      icon={
        <ClockIcon className="w-[24px] h-[24px] [&_path]:fill-[var(--primary-6)]" />
      }
      label={t("Fast Track access window")}
      value={formattedDateTime}
      isLoading={isLoading}
      rightContent={editable ? <ChevronRightIcon /> : undefined}
    />
  );

  const travelersRow = (
    <BookingInfoRow
      icon={
        <UserIcon className="w-[24px] h-[24px] [&_path]:fill-[var(--primary-6)]" />
      }
      label={t("Travelers")}
      value={travelersText}
      isLoading={isLoading}
      rightContent={editable ? <ChevronRightIcon /> : undefined}
    />
  );

  return (
    <div className={cls("flex flex-col", className)}>
      {/* Airport */}
      <BookingInfoRow
        icon={
          isLoading ? (
            <div className="w-[24px] h-[24px] rounded-full bg-fill-2" />
          ) : (
            <img
              src={airportInfo.flagUrl}
              alt={airportInfo.name}
              width={24}
              height={24}
              className="rounded-full object-cover min-w-[24px] min-h-[24px]"
            />
          )
        }
        label={airportInfo.name}
        value={airportInfo.terminal}
        isLoading={isLoading}
      />

      {/* Access Window */}
      {editable && routerQuery ? (
        <Link href={{ pathname: "/booking-details", query: routerQuery }}>
          {accessWindowRow}
        </Link>
      ) : (
        accessWindowRow
      )}

      {/* Travelers */}
      {editable && routerQuery ? (
        <Link href={{ pathname: "/travelers", query: routerQuery }}>
          {travelersRow}
        </Link>
      ) : (
        travelersRow
      )}
    </div>
  );
};
