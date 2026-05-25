import { useInitialRedirectIframe } from "@/mocks/kit-extras";
import { changeStatusBarColor, getCSSVariableValue } from "@boxo/esim-util";
import { useEffect } from "react";

export default function () {
  useEffect(() => {
    changeStatusBarColor(getCSSVariableValue("--fill-white"));
  }, []);

  // Use initial redirect iframe hook with pass-freedom specific options
  // Onboarding is now shown as a bottom drawer on /passes (controlled by
  // `is_introduction_screen_displayed` in localStorage), so we skip the
  // legacy /introduction full-page redirect and land directly on /passes.
  useInitialRedirectIframe({
    defaultPath: "/passes",
    skipIntroduction: true,
  });

  return null;
}
