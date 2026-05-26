/**
 * Demo-only shims for exports that previously lived in `@boxo/esim-ui` but
 * are no longer part of `@appboxo/ui-kit` (they were business / host
 * concerns and didn't belong in a host-agnostic UI kit).
 *
 * The pass-freedom demo still references them, so we provide minimal stubs
 * here. Real apps should implement their own tracking / iframe behaviour.
 */

import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

// ---------- useTrackContext ----------

export interface TrackContext {
  track: (event: string, payload?: Record<string, unknown>) => void;
  identify: (id: string, payload?: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTrackContext = (): TrackContext => {
  const track = useCallback(
    (event: string, payload?: Record<string, unknown>) => {
      if (typeof console !== "undefined") {
        console.log("[track]", event, payload);
      }
    },
    [],
  );
  const identify = useCallback(
    (id: string, payload?: Record<string, unknown>) => {
      if (typeof console !== "undefined") {
        console.log("[identify]", id, payload);
      }
    },
    [],
  );
  const reset = useCallback(() => undefined, []);
  return { track, identify, reset };
};

// ---------- useInitialRedirectIframe ----------

interface UseInitialRedirectIframeArgs {
  /** Path to navigate to once the boot handshake settles. */
  defaultPath?: string;
  /** Production also honours a `/introduction` full-page redirect for legacy
   *  app versions; current production sets this to `true` because the
   *  onboarding lives in a bottom-sheet drawer on `/passes`. The demo mirrors
   *  that behaviour and never visits the legacy route either way. */
  skipIntroduction?: boolean;
}

/**
 * In production this hook handles the Boxo iframe auth handshake and then
 * navigates the user to `defaultPath`. The standalone demo doesn't need
 * the handshake (there's no host iframe), but it DOES need the navigation
 * piece so that hitting `/` lands on `/passes` — otherwise `pages/index.tsx`
 * just renders `null` and the demo looks broken.
 */
export const useInitialRedirectIframe = ({
  defaultPath,
}: UseInitialRedirectIframeArgs = {}) => {
  const router = useRouter();
  useEffect(() => {
    if (!defaultPath) return;
    if (router.pathname !== "/") return;
    router.replace(defaultPath);
  }, [defaultPath, router]);
};

// ---------- WithTrack ----------

/**
 * In production this provider mounts analytics SDKs (Amplitude, etc.). In the
 * demo we just pass children through.
 */
export const WithTrack = ({ children }: PropsWithChildren) =>
  React.createElement(React.Fragment, null, children);

// ---------- useIframeInitData ----------

/**
 * Production wires this up to the Boxo iframe init handshake to detect dark
 * mode and primary color from the host. In the demo, light mode + default.
 */
export const useIframeInitData = (_opts?: unknown) => ({
  shouldUseDarkMode: false,
  primaryColor: undefined as string | undefined,
  data: { app_id: "demo" } as Record<string, unknown>,
  isLoading: false,
});

// ---------- useLocation ----------

interface UseLocationArgs {
  enabled?: boolean;
  geodataParams?: Record<string, unknown>;
}

/**
 * The real hook talks to the host bridge to request geolocation permission.
 * In the demo we just resolve to a fixed location.
 */
export const useLocation = (_args?: UseLocationArgs) => {
  const data = { latitude: 0, longitude: 0 };
  return {
    data,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
    refetch: async () => ({ data }),
  };
};
