// Minimum i18n stub. `@appboxo/ui-kit` components call
// `useTranslation()` for a handful of UI strings (Done / Close /
// Search / Copied …). Without a provider those throw at runtime, so
// even if your app is English-only you still need an i18n root.
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        Copied: "Copied",
        Done: "Done",
        Close: "Close",
        Select: "Select",
      },
    },
  },
});

export default i18n;
