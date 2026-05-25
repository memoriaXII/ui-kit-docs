import { useTranslation } from "next-i18next";
import { Flex, Body2, Callout } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import GlobeIcon from "@/assets/icons/globe.svg";

export const EnableLocationPrompt = ({
  refetchLocation,
}: {
  refetchLocation: () => Promise<unknown>;
}) => {
  const { t } = useTranslation();

  const handleOpenSettings = async () => {
    addHapticFeedback("medium");
    await refetchLocation();
  };

  return (
    <button
      onClick={handleOpenSettings}
      className="w-full bg-fill-1 rounded-[20px] p-[16px] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)]"
    >
      <Flex vertical={false} gap={16} align="center">
        <div className="bg-primary-2 rounded-full p-[12px] shrink-0">
          <GlobeIcon width={24} height={24} />
        </div>
        <Flex gap={4} className="text-left">
          <Callout weight="semibold" className="text-text-5">
            {t("Enable location services")}
          </Callout>
          <Body2 className="text-text-4">
            {t("To check available lounges nearby")}
          </Body2>
        </Flex>
      </Flex>
    </button>
  );
};
