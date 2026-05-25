/**
 * Desktop-specific version of useBoxoLogin
 * Uses desktopLogin with promise caching to prevent duplicate authorize calls
 *
 * This is desktop-specific because:
 * - Desktop environments (iframe) have different timing characteristics
 * - Multiple components may trigger login simultaneously
 * - Need to prevent race conditions between useBoxoLogin and interceptors
 */

import { hasToken, storeToken } from "@boxo/api";
import { PUBLIC_PATHS } from "@boxo/esim-util";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/nextjs";
import { desktopLogin } from "./desktop-login";

export function useDesktopBoxoLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (PUBLIC_PATHS.includes(router.pathname)) {
          Sentry.captureMessage("public path, skipping login");
          setIsLoading(false);
          return;
        }

        const data = await desktopLogin();
        storeToken(data.token, data.refreshToken);
        setIsLoggedIn(true);
      } catch (error) {
        Sentry.captureException(error);
        console.error("[useDesktopBoxoLogin] Login failed:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    const hasTokenResult = hasToken();

    if (!hasTokenResult) {
      fetchData();
    } else {
      setIsLoggedIn(true);
      setIsLoading(false);
    }
  }, [router.pathname]);

  return { isLoggedIn, isLoading, error };
}
