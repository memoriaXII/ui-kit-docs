import { Body1, Body2, Card } from "@appboxo/ui-kit";
import { cls } from "@arco-design/mobile-utils";
import { useTranslation } from "next-i18next";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CloseCircleIcon from "@/assets/icons/close-circle.svg";
import { formatRouteTypes } from "@/lib/quote-utils";
import { formatPrice, CASHBACK_PERCENT, computeCashback } from "@/lib/price";
import type { Lounge } from "@boxo/api/lounge";
import { isNumber } from "lodash-es";

interface FastTrackCardProps {
  lounge: Lounge & { imageUrl?: string };
  selected: boolean;
  onSelect: () => void;
}

interface InfoItemProps {
  icon: "check" | "close";
  text: string;
}

const InfoItem = ({ icon, text }: InfoItemProps) => {
  return (
    <div className="flex flex-row items-start gap-[8px]">
      {icon === "check" ? (
        <CheckCircleIcon
          className="flex-shrink-0 mt-[2px] [&_path]:fill-[var(--success-6)]"
          width={16}
          height={16}
        />
      ) : (
        <CloseCircleIcon
          className="flex-shrink-0 mt-[2px]"
          width={16}
          height={16}
        />
      )}
      <Body2 className="text-text-4">{text}</Body2>
    </div>
  );
};

export const FastTrackCard = ({
  lounge,
  selected = false,
  onSelect,
}: FastTrackCardProps) => {
  const { t } = useTranslation();
  const routeTypesTitle = formatRouteTypes(lounge.route_types);
  const isFreeEntry = lounge.free_entries_available;
  const basePrice = lounge.price ?? 0;
  const finalPrice = isFreeEntry ? 0 : basePrice;
  const showStrikethrough = isFreeEntry && basePrice > 0;
  const cashbackAmount = computeCashback(finalPrice);

  return (
    <div
      onClick={onSelect}
      className={cls(
        "p-[2px] rounded-[16px] cursor-pointer",
        selected ? "bg-freedom-gradient" : "bg-transparent",
      )}
    >
      <Card className="bg-fill-1 shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] rounded-[14px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-row items-center gap-[12px]">
            <div
              className={cls(
                "flex-shrink-0 w-[24px] h-[24px] rounded-full border-[2px] flex items-center justify-center transition-colors",
                selected ? "border-primary-6" : "border-text-2",
              )}
            >
              {selected && (
                <div className="w-[14px] h-[14px] rounded-full bg-primary-6" />
              )}
            </div>
            <Body1 weight="semibold" className="text-text-5">
              {routeTypesTitle || lounge.title}
            </Body1>
          </div>

          <Body2 className="text-text-4">{lounge.location}</Body2>

          <div className="flex flex-col gap-[8px]">
            {lounge.child_policy && (
              <InfoItem icon="check" text={lounge.child_policy} />
            )}
            {isNumber(lounge.advance_booking_hours) && (
              <InfoItem
                icon="check"
                text={t("Booking required {{hours}}h in advance", {
                  hours: lounge.advance_booking_hours,
                })}
              />
            )}
            <InfoItem icon="close" text={t("Non-refundable")} />
          </div>

          <div className="h-px bg-fill-2" />

          <div className="flex flex-row items-center justify-between gap-[12px]">
            <Body1 weight="semibold" className="text-text-5">
              {t("Price")}
            </Body1>
            <div className="flex flex-row items-center gap-[8px]">
              {showStrikethrough && (
                <div className="relative inline-flex items-center">
                  <Body1 className="text-text-3">
                    {formatPrice(basePrice, lounge.currency)}
                  </Body1>
                  <span className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-text-3 pointer-events-none" />
                </div>
              )}
              <Body1 weight="semibold" className="text-text-5">
                {formatPrice(finalPrice, lounge.currency)}
              </Body1>
            </div>
          </div>

          {CASHBACK_PERCENT > 0 && cashbackAmount > 0 && (
            <div className="flex flex-row items-center justify-between gap-[12px]">
              <Body2 className="text-text-4">
                {t("Cashback ({{percent}}%)", { percent: CASHBACK_PERCENT })}
              </Body2>
              <Body2 weight="semibold" className="text-freedom-gradient">
                +{formatPrice(cashbackAmount, lounge.currency)}
              </Body2>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
