import { useTranslation } from "next-i18next";
import { Body2, Card } from "@appboxo/ui-kit";
import { cls } from "@arco-design/mobile-utils";

interface ThingsToKnowProps {
  className?: string;
}

export const ThingsToKnow = ({ className }: ThingsToKnowProps) => {
  const { t } = useTranslation();

  const items = [
    t("Present your pass and the passes of those traveling with you"),
    t("We recommend arriving a few minutes before your selected time window"),
    t("Guest travelers must enter with you"),
    t("Children aged 6 and under enter free with an accompanying adult"),
  ];

  return (
    <Card className={cls("flex flex-col gap-[12px] bg-fill-1", className)}>
      <Body2 weight="semibold" className="text-text-5">
        {t("Things to know")}
      </Body2>
      <div className="flex flex-col gap-[4px] text-text-4">
        {items.map((item, index) => (
          <div className="flex gap-[6px]" key={index}>
            <Body2>•</Body2>
            <Body2>{item}</Body2>
          </div>
        ))}
      </div>
    </Card>
  );
};
