import appboxoSDK from "@appboxo/js-sdk";
import { useQuery } from "@tanstack/react-query";
import { safeWindow } from "@boxo/esim-util";

interface LocationData {
  available: boolean | number;
  lat: string;
  long: string;
}

const LOCATION_CACHE_KEY = "location_cache";
const LOCATION_CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

/**
 * Clear cached location from localStorage
 */
function clearCachedLocation() {
  if (!safeWindow) return;
  try {
    localStorage.removeItem(LOCATION_CACHE_KEY);
  } catch (error) {
    // Ignore errors
  }
}

/**
 * Get cached location from localStorage
 * Also validates permission state - clears cache if permission was reset to denied
 */
async function getCachedLocation(): Promise<LocationData | null> {
  if (!safeWindow) return null;
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Check if cache is still valid (within 30 minutes)
      if (Date.now() - timestamp < LOCATION_CACHE_EXPIRY) {
        // Validate permission state - if permission was reset to denied, clear cache
        const permissionState = await checkGeolocationPermission();
        if (permissionState === "denied") {
          // Permission was reset - clear invalid cache
          clearCachedLocation();
          return null;
        }
        return data;
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return null;
}

/**
 * Save location to localStorage cache
 */
function setCachedLocation(location: LocationData) {
  if (!safeWindow) return;
  try {
    localStorage.setItem(
      LOCATION_CACHE_KEY,
      JSON.stringify({
        data: location,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    // Ignore errors
  }
}

/**
 * Check if geolocation permission is granted (if Permissions API is available)
 */
async function checkGeolocationPermission(): Promise<
  "granted" | "denied" | "prompt" | null
> {
  if (typeof navigator !== "undefined" && "permissions" in navigator) {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      return result.state;
    } catch (error) {
      // Permissions API not supported or failed
      return null;
    }
  }
  return null;
}

/**
 * Get location using browser Geolocation API (for desktop/web)
 */
function getBrowserLocation(): Promise<LocationData> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        available: false,
        lat: "",
        long: "",
      });
      return;
    }

    // Check permission status first (if available)
    checkGeolocationPermission()
      .then(async (permissionState) => {
        // If permission is explicitly denied, return immediately
        if (permissionState === "denied") {
          resolve({
            available: false,
            lat: "",
            long: "",
          });
          return;
        }

        // If permission is granted, try to use cached location first
        if (permissionState === "granted") {
          const cached = await getCachedLocation();
          if (cached && cached.available && cached.lat && cached.long) {
            // Return cached location immediately
            // Still try to get fresh location in background
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const freshLocation: LocationData = {
                  available: true,
                  lat: position.coords.latitude.toString(),
                  long: position.coords.longitude.toString(),
                };
                setCachedLocation(freshLocation);
              },
              () => {
                // Ignore errors when updating cache
              },
              {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000,
              },
            );
            return;
          }
        }

        const tryGetPosition = (options: PositionOptions, isRetry = false) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const locationData: LocationData = {
                available: true,
                lat: position.coords.latitude.toString(),
                long: position.coords.longitude.toString(),
              };
              // Cache the location
              setCachedLocation(locationData);
              resolve(locationData);
            },
            (error) => {
              // Check error code to distinguish between permission denied and other errors
              // PERMISSION_DENIED = 1, POSITION_UNAVAILABLE = 2, TIMEOUT = 3
              if (error.code === 1) {
                // Permission denied - user explicitly denied
                resolve({
                  available: false,
                  lat: "",
                  long: "",
                });
              } else if (error.code === 3 && !isRetry) {
                // Timeout - try again with longer timeout and older cache
                // This can happen even if permission is granted
                tryGetPosition(
                  {
                    enableHighAccuracy: false,
                    timeout: 20000, // Longer timeout for retry
                    maximumAge: 600000, // 10 minutes - use older cached position
                  },
                  true,
                );
              } else {
                // Other errors or retry failed
                // If permission is granted, try to use cached location as fallback
                if (permissionState === "granted") {
                  getCachedLocation().then((cached) => {
                    if (
                      cached &&
                      cached.available &&
                      cached.lat &&
                      cached.long
                    ) {
                      resolve(cached);
                      return;
                    }
                    resolve({
                      available: false,
                      lat: "",
                      long: "",
                    });
                  });
                  return;
                }
                resolve({
                  available: false,
                  lat: "",
                  long: "",
                });
              }
            },
            options,
          );
        };

        // Initial attempt
        tryGetPosition({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      })
      .catch(() => {
        // If permission check fails, proceed without permission check
        const tryGetPosition = (options: PositionOptions, isRetry = false) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const locationData: LocationData = {
                available: true,
                lat: position.coords.latitude.toString(),
                long: position.coords.longitude.toString(),
              };
              // Cache the location
              setCachedLocation(locationData);
              resolve(locationData);
            },
            (error) => {
              // Check error code to distinguish between permission denied and other errors
              // PERMISSION_DENIED = 1, POSITION_UNAVAILABLE = 2, TIMEOUT = 3
              if (error.code === 1) {
                // Permission denied - user explicitly denied
                resolve({
                  available: false,
                  lat: "",
                  long: "",
                });
              } else if (error.code === 3 && !isRetry) {
                // Timeout - try again with longer timeout and older cache
                tryGetPosition(
                  {
                    enableHighAccuracy: false,
                    timeout: 20000, // Longer timeout for retry
                    maximumAge: 600000, // 10 minutes - use older cached position
                  },
                  true,
                );
              } else {
                // Other errors or retry failed
                // Check permission before using cache
                checkGeolocationPermission().then(async (permissionState) => {
                  if (permissionState === "granted") {
                    const cached = await getCachedLocation();
                    if (
                      cached &&
                      cached.available &&
                      cached.lat &&
                      cached.long
                    ) {
                      resolve(cached);
                      return;
                    }
                  }
                  resolve({
                    available: false,
                    lat: "",
                    long: "",
                  });
                });
              }
            },
            options,
          );
        };

        // Initial attempt
        tryGetPosition({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });
  });
}

/**
 * Get location using AppBoxo SDK (for mobile app)
 */
function getAppboxoLocation(): Promise<LocationData> {
  return appboxoSDK.sendPromise("AppBoxoWebAppGetGeodata");
}

/**
 * Get location - uses AppBoxo SDK (works for both mobile and desktop iframe)
 * Falls back to browser API if SDK is not available
 */
async function getLocation(): Promise<LocationData> {
  // Try AppBoxo SDK first (works for both mobile and desktop iframe with web-sdk)
  // In desktop iframe, js-sdk will send postMessage to parent window (web-sdk)
  // In mobile, js-sdk will communicate with native SDK
  try {
    // Check if SDK supports GetGeodata
    if (appboxoSDK.supports && appboxoSDK.supports("AppBoxoWebAppGetGeodata")) {
      return await getAppboxoLocation();
    }
  } catch (error) {
    // SDK call failed, fallback to browser API
    console.log(
      "[Location] SDK GetGeodata failed, falling back to browser API:",
      error,
    );
  }

  // Fallback: Use browser Geolocation API directly
  // This handles cases where:
  // - SDK is not available
  // - We're in a regular browser (not iframe)
  // - SDK call failed
  return getBrowserLocation();
}

export function useLocation({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery<LocationData>({
    queryKey: ["location"],
    queryFn: async () => {
      // First, check if we have a cached location (with permission validation)
      const cached = await getCachedLocation();
      if (cached && cached.available && cached.lat && cached.long) {
        // Return cached location immediately
        // Still try to get fresh location in background
        getLocation()
          .then((freshData) => {
            if (freshData.available && freshData.lat && freshData.long) {
              setCachedLocation(freshData);
            }
          })
          .catch(() => {
            // Ignore errors
          });
        return cached;
      }

      // No cache, try to get location
      const data = await getLocation();
      return data as LocationData;
    },
    enabled,
    staleTime: 30 * 60 * 1000, // 30 minutes - user location doesn't change frequently
    gcTime: 60 * 60 * 1000, // 60 minutes - keep in cache for longer
    retry: false, // Don't retry on permission denied
    // Use cached data as initial data (synchronous fallback for initial render)
    initialData: () => {
      // Synchronous fallback - will be validated in queryFn
      if (!safeWindow) return undefined;
      try {
        const cached = localStorage.getItem(LOCATION_CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          return data;
        }
      } catch (error) {
        // Ignore errors
      }
      return undefined;
    },
  });
}
