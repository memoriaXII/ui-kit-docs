import { useCallback, useState } from "react";

export const useOnboardingDrawer = () => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    show,
    hide,
  };
};
