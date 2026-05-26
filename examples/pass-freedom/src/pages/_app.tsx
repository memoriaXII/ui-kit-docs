import "./global.css";
// Compiled @arco-design/mobile-react component styles with CSS-variable
// hooks (var(--primary-color) etc.). Built once by the kit's
// `scripts/build-arco-mobile-css.mjs` using the same rollup + postcss +
// less pipeline as production `@boxo/esim-theme/dist/freedom.css`. The
// Arco-shipped `dist/style.min.css` is just a mixin reference and bakes
// in literal Arco defaults (#165DFF blue), so brand overrides can't
// take effect against it — we ship the var-enabled variant from the
// kit instead.
import "@appboxo/ui-kit/themes/arco-mobile.css";
// Kit component-local stylesheets (Tip icon sizing, Card padding,
// Input borders, etc.). Tsup extracts these into a single bundle.
import "@appboxo/ui-kit/styles.css";
// Freedom brand tokens. The `#root` block here overrides Arco defaults
// like `--primary-color: var(--primary-6)` so every Arco component
// inherits the Freedom green palette + `--button-radius: 16px` pill
// shape, identical to the production esim-theme freedom bundle.
import "@appboxo/ui-kit/themes/freedom/theme.css";
// Arco Design Web (DatePicker, TimePicker on booking-details)
import "@arco-design/web-react/dist/css/arco.css";

import setRootPixel from "@arco-design/mobile-react/tools/flexible";
import { NextUIKitProvider } from "@appboxo/ui-kit/next";
import { safeWindow } from "@boxo/esim-util";
const initEruda = () => {
  // no-op in demo
};
const setMenuButtonVisibility = (_visible: boolean) => {
  // no-op in demo
};
import { useIsomorphicLayoutEffect, useMount } from "ahooks";
import type { AppProps } from "next/app";
import { AppComponent } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import React, { useEffect } from "react";

import fonts from "@/lib/font";
import { withProviders } from "@/lib/with-providers";
import { useTrackContext } from "@/mocks/kit-extras";
import { getTrackingProps } from "@/lib/tracking";
import { overwriteRequest } from "@/lib/overwriteRequest";
import {
  markGoingBack,
  resetGoingBack,
  trackInternalNavigation,
} from "@/lib/nav-history";

initEruda();

if (safeWindow) {
  setRootPixel();
  setMenuButtonVisibility(false);
}

function App({ Component, pageProps, router }: AppProps) {
  const { locale = "en", locales = [], defaultLocale = "en" } = router;
  const { track } = useTrackContext();

  useIsomorphicLayoutEffect(() => {
    overwriteRequest({ locale, locales, defaultLocale });
  }, [locale, locales, defaultLocale]);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.dir = "ltr";
  }, [locale]);

  // Track successful in-app navigations so the back button can tell deep-link
  // entries (no internal history) from normal in-app flows.
  useEffect(() => {
    router.events.on("routeChangeComplete", trackInternalNavigation);
    router.events.on("routeChangeError", resetGoingBack);
    router.beforePopState(() => {
      markGoingBack();
      return true;
    });
    return () => {
      router.events.off("routeChangeComplete", trackInternalNavigation);
      router.events.off("routeChangeError", resetGoingBack);
      router.beforePopState(() => true);
    };
  }, [router]);

  // iOS WebView viewport height fix
  useIsomorphicLayoutEffect(() => {
    const setVH = () => {
      const h = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${h}px`);
    };

    setVH();

    ["resize", "orientationchange"].forEach((evt) =>
      window.addEventListener(evt, setVH),
    );
    window.visualViewport?.addEventListener?.("resize", setVH);
    window.addEventListener("pageshow", setVH);

    return () => {
      ["resize", "orientationchange"].forEach((evt) =>
        window.removeEventListener(evt, setVH),
      );
      window.visualViewport?.removeEventListener?.("resize", setVH);
      window.removeEventListener("pageshow", setVH);
    };
  }, []);

  // Listen for logout notification from host app
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "appboxo-host-response" &&
        event.data?.handler === "AppBoxoWebAppLogout" &&
        event.data?.data?.action === "logout"
      ) {
        try {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("refresh_token");
        } catch (error) {
          console.error(
            "[pass-freedom] Error clearing storage on logout:",
            error,
          );
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  useMount(async () => {
    const trackingProps = await getTrackingProps();
    track("miniapp.launch.opened", trackingProps);
  });

  return (
    <NextUIKitProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content"
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${(fonts[locale] || fonts["en"]!).style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </NextUIKitProvider>
  );
}

const AppWithTranslation = withProviders(
  appWithTranslation(App) as AppComponent,
);
export default AppWithTranslation;
