import { useTranslation } from "next-i18next";
import { Footnote2, Title3 } from "@appboxo/ui-kit";
import styles from "./free-pass-banner.module.css";

interface FreePassBannerProps {
  onRedeemClick?: () => void;
}

export const FreePassBanner = ({ onRedeemClick }: FreePassBannerProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.banner}>
      <div className={styles.textSection}>
        <Title3 weight="bold" className={styles.title}>
          {t("Free passes available")}
        </Title3>
        <Footnote2 className={styles.description}>
          {t(
            "Redeem your complimentary entries at checkout. The discount will apply automatically.",
          )}
        </Footnote2>
        <button
          type="button"
          className={styles.redeemButton}
          onClick={onRedeemClick}
        >
          {t("Redeem now")}
        </button>
      </div>
    </div>
  );
};
