import { useTranslation } from "next-i18next";
import { Body1, PopupSwiper, Title1 } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { PrimaryButton } from "@/components/button/button";

interface TimeSlotUnavailablePopupProps {
  visible: boolean;
  onClose: () => void;
  onSelectNewTime: () => void;
}

export const TimeSlotUnavailablePopup = ({
  visible,
  onClose,
  onSelectNewTime,
}: TimeSlotUnavailablePopupProps) => {
  const { t } = useTranslation();

  const handleSelectNewTime = () => {
    addHapticFeedback("medium");
    onSelectNewTime();
    onClose();
  };

  return (
    <PopupSwiper
      visible={visible}
      close={onClose}
      direction="bottom"
      allowSwipeDirections={["bottom"]}
      contentClass="pb-[40px] max-h-[85dvh]"
    >
      <div className="flex flex-col px-[20px] py-[16px]">
        <Title1 weight="semibold">{t("Time slot unavailable")}</Title1>
        <Body1 className="pt-[8px] pb-[32px]">
          {t(
            "We tried to reserve this Fast Track access window for you, but it's no longer available. Please select a new time window to continue.",
          )}
        </Body1>
        <PrimaryButton
          text={t("Select a new time")}
          onClick={handleSelectNewTime}
        />
      </div>
    </PopupSwiper>
  );
};
