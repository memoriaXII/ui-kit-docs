/**
 * Desktop-specific login function with global promise cache
 * Prevents duplicate login calls when multiple components/interceptors trigger login simultaneously
 *
 * This is desktop-specific because:
 * - Desktop environments (iframe) have different timing characteristics
 * - Multiple API requests may trigger login simultaneously
 * - Need to prevent race conditions between useBoxoLogin and interceptors
 */

import { login as originalLogin } from "@boxo/esim-util";

// Global login promise cache to prevent duplicate calls
let loginPromise: Promise<{ token: string; refreshToken: string }> | null =
  null;

/**
 * Desktop-specific login with promise caching
 * Ensures only one login call is made at a time, even if called from multiple places
 */
export async function desktopLogin(): Promise<{
  token: string;
  refreshToken: string;
}> {
  // If login is already in progress, return the same promise
  if (loginPromise) {
    console.info(
      "[DesktopLogin] Login already in progress, reusing existing promise",
    );
    return loginPromise;
  }

  console.info("[DesktopLogin] Starting new login call");

  // Create and cache the login promise
  loginPromise = originalLogin();

  try {
    const result = await loginPromise;
    console.info("[DesktopLogin] Login completed successfully");
    return result;
  } catch (error) {
    console.error("[DesktopLogin] Login failed", error);
    throw error;
  } finally {
    loginPromise = null;
  }
}

export function isLoginInProgress(): boolean {
  return loginPromise !== null;
}

export function getCurrentLoginPromise(): Promise<{
  token: string;
  refreshToken: string;
}> | null {
  return loginPromise;
}
