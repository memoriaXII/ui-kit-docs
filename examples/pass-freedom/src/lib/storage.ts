import { safeWindow } from "@boxo/esim-util";

const introductionScreenDisplayedKey = "is_introduction_screen_displayed";

export const setIntroductionScreenDisplayed = () => {
  localStorage.setItem(introductionScreenDisplayedKey, "true");
};

export const getIntroductionScreenDisplayed = () => {
  return !!(
    safeWindow?.localStorage.getItem(introductionScreenDisplayedKey) === "true"
  );
};
