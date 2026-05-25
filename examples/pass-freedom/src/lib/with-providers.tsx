import { ContextProvider } from "@arco-design/mobile-react";
import { ILocale } from "@arco-design/mobile-utils";
import { MultiProvider, QueryProvider, useDevice } from "@appboxo/ui-kit";
import { WithTrack } from "@/mocks/kit-extras";
import { useIframeInitData } from "@/mocks/kit-extras";
import { WithLoungeAuth } from "./with-lounge-auth";
import {
  changeStatusBarColor,
  getCSSVariableValue,
  safeWindow,
} from "@boxo/esim-util";
import { QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { AppComponent } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_ID || "";
const queryClient = new QueryClient();

/**
 * Resolve the status bar / top safe-area color from the active theme.
 * `--fill-white` is the same variable used as the layout/navbar background
 * in `@appboxo/ui-kit`, so reading it keeps the safe-area in sync with the
 * page background for both light and dark themes (Freedom theme defines
 * `--fill-white: #f7f7f7` in light and `#000000` in dark).
 */
const getSafeAreaColor = (): string => {
  const isDark = safeWindow?.document
    .getElementById("root")
    ?.classList.contains("arco-theme-dark");
  return (
    getCSSVariableValue("--fill-white") || (isDark ? "#000000" : "#ffffff")
  );
};

const SUPPORTED_LOCALES = ["en", "ru", "kk"];

const enLocale = {
  locale: "en",
  SearchBar: {
    cancelBtn: "",
  },
} as ILocale;

export function withProviders(App: AppComponent) {
  return function AppWithProviders(appProps: AppProps) {
    const { isAndroid } = useDevice();
    const router = useRouter();
    const { locale } = router;
    const { shouldUseDarkMode } = useIframeInitData({
      router,
      currentLocale: locale,
      supportedLocales: SUPPORTED_LOCALES,
    });

    useEffect(() => {
      changeStatusBarColor(getSafeAreaColor());
    }, [shouldUseDarkMode]);

    const providers = useMemo(
      () => [
        <QueryProvider queryClient={queryClient} />,
        <IntercomProvider
          appId={INTERCOM_APP_ID}
          autoBoot
          autoBootProps={{
            hideDefaultLauncher: true,
            actionColor: getCSSVariableValue("--primary-color"),
            backgroundColor: getCSSVariableValue("--primary-color"),
          }}
          onShow={() =>
            changeStatusBarColor(getCSSVariableValue("--primary-color"))
          }
          onHide={() => changeStatusBarColor(getSafeAreaColor())}
        />,
        <WithLoungeAuth />,
        <WithTrack />,
      ],
      [],
    );
    // Arco UI uses en for all supported locales (en/ru/kk)
    const arcoLocale = enLocale;

    /* fix Next.js hydration error, and `children` is required props, so can't add `ContextProvider` to `MultiProvider` */
    return (
      <ContextProvider
        system={isAndroid ? "android" : "ios"}
        locale={arcoLocale}
        useDarkMode={shouldUseDarkMode}
      >
        <MultiProvider providers={providers}>
          <App {...appProps} />
        </MultiProvider>
      </ContextProvider>
    );
  };
}
