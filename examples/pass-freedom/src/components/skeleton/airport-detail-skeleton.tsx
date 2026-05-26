import { Body1, Body2, Card, Skeleton } from "@appboxo/ui-kit";
import { useTranslation } from "next-i18next";

const FastTrackCardSkeleton = () => {
  const { t } = useTranslation();

  return (
    <Card className="bg-fill-1 shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] border-[1.5px] border-transparent">
      <div className="flex flex-col gap-[16px]">
        {/* Header row: radio + single bar label */}
        <div className="flex flex-row items-center gap-[12px]">
          <div className="w-[24px] h-[24px] rounded-full border-[2px] border-text-2 flex-shrink-0" />
          <Skeleton width={180} height={12} className="max-w-full" />
        </div>

        {/* 3-line description */}
        <div className="flex flex-col gap-[8px]">
          <Skeleton width="100%" height={12} />
          <Skeleton width="100%" height={12} />
          <Skeleton width={220} height={12} />
        </div>

        <div className="h-px bg-line-1" />

        {/* Price / cashback rows */}
        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-row items-center justify-between gap-[12px] h-[24px]">
            <Body1 weight="semibold" className="text-text-5">
              {t("Price")}
            </Body1>
            <Skeleton width={64} height={12} />
          </div>
          <div className="flex flex-row items-center justify-between gap-[12px] h-[20px]">
            <Body2 className="text-text-4">{t("Cashback")}</Body2>
            <Skeleton width={64} height={12} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const AirportDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <FastTrackCardSkeleton />
      <FastTrackCardSkeleton />
      <FastTrackCardSkeleton />
    </div>
  );
};
