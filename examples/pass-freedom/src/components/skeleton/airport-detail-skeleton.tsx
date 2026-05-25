import { Body1, Body2, Card } from "@appboxo/ui-kit";
import { useTranslation } from "next-i18next";

const FastTrackCardSkeleton = () => {
  const { t } = useTranslation();

  return (
    <Card className="bg-fill-1 shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] border-[1.5px] border-transparent">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-row items-center gap-[12px]">
          <div className="w-[24px] h-[24px] rounded-full border-[2px] border-text-2 flex-shrink-0" />
          <div className="flex flex-col items-start justify-center h-[24px] flex-1">
            <div className="bg-fill-3 h-[12px] rounded-full w-[180px] max-w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col items-start justify-center h-[20px] w-full">
            <div className="bg-fill-3 h-[12px] rounded-full w-full" />
          </div>
          <div className="flex flex-col items-start justify-center h-[20px] w-full">
            <div className="bg-fill-3 h-[12px] rounded-full w-full" />
          </div>
          <div className="flex flex-col items-start justify-center h-[20px] w-[220px]">
            <div className="bg-fill-3 h-[12px] rounded-full w-full" />
          </div>
        </div>

        <div className="h-px bg-line-1" />

        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-row items-center justify-between gap-[12px] h-[24px]">
            <Body1 weight="semibold" className="text-text-5">
              {t("Price")}
            </Body1>
            <div className="bg-fill-3 h-[12px] rounded-full w-[64px]" />
          </div>
          <div className="flex flex-row items-center justify-between gap-[12px] h-[20px]">
            <Body2 className="text-text-4">{t("Cashback")}</Body2>
            <div className="bg-fill-3 h-[12px] rounded-full w-[64px]" />
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
