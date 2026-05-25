import { Cell } from "@arco-design/mobile-react";
import { useTranslation } from "next-i18next";
import { Body2, Title3, TouchCell } from "@appboxo/ui-kit";
import GiftIcon from "@/assets/icons/gift.svg";

interface BenefitsListProps {
  freePassCount: number;
  onClick: () => void;
}

export const BenefitsList = ({ freePassCount, onClick }: BenefitsListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Title3
        weight="semibold"
        style={{ color: "var(--text-5)", marginBottom: "8px" }}
      >
        {t("Benefits")}
      </Title3>
      <Cell.Group bordered={false} className="mx-[-16px]">
        <TouchCell
          className="py-[16px] px-[16px]"
          activeClass="bg-[--fill-1]"
          icon={<GiftIcon />}
          label={
            <Body2 weight="semibold" style={{ color: "var(--text-5)" }}>
              {t("{{number}} Free passes available", {
                number: freePassCount,
              })}
            </Body2>
          }
          desc={
            <Body2 style={{ color: "var(--text-3)" }}>
              {t("Included with your banking benefits")}
            </Body2>
          }
          bordered={false}
          onClick={onClick}
          showArrow={false}
        />
      </Cell.Group>
    </div>
  );
};
