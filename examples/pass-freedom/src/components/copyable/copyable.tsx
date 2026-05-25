import { DefaultPopoverProps } from "@arco-design/mobile-react/cjs/popover";
import { addHapticFeedback } from "@boxo/esim-util";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toast } from "@appboxo/ui-kit";

interface CopyableProps extends Pick<DefaultPopoverProps, "className"> {
  text: string;
  children: ReactNode;
}

const Copyable = ({ text, children }: CopyableProps) => {
  const { t } = useTranslation();

  const onCopy = () => {
    addHapticFeedback("medium");
    Toast.info(t("Copied"));
  };

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      {children}
    </CopyToClipboard>
  );
};

export default Copyable;
