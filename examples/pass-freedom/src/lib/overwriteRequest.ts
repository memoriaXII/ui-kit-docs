import {
  refreshTokenUrl,
  removeToken,
  request,
  safeWindow,
  storeToken,
  TokenKey,
} from "@boxo/api";
import { Mutex } from "async-mutex";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const header = {
  acceptLanguage: "Accept-Language",
};

const checkLang = ({
  locale,
  locales,
  defaultLocale,
}: {
  locale?: string;
  locales: string[];
  defaultLocale: string;
}) => {
  // First priority: use provided locale if it's valid
  if (locale && locales.includes(locale)) {
    return locale;
  }

  // Second priority: try to detect device/browser language
  if (typeof window !== "undefined" && navigator.language) {
    const deviceLang = navigator.language.split("-")[0]; // Get language code (e.g., "de" from "de-DE")
    if (deviceLang && locales.includes(deviceLang)) {
      return deviceLang;
    }
  }

  // Fallback: default locale
  return defaultLocale;
};

const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem(TokenKey.RefreshToken);

  const response = await request.post(refreshTokenUrl, {
    refresh: refreshToken,
  });

  return {
    token: response?.data?.access,
    refreshToken: response?.data?.refresh,
  };
};

export const overwriteRequest = (localeSetting: {
  locale?: string;
  locales: string[];
  defaultLocale: string;
}) => {
  const lang = checkLang(localeSetting);

  // Clear existing interceptors
  request.interceptors.request.clear();
  request.interceptors.response.clear();

  const requestInterceptor = [
    async (config: InternalAxiosRequestConfig) => {
      const token = safeWindow?.localStorage.getItem(TokenKey.Token) ?? "";

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      config.headers["Content-Type"] = "application/json";
      config.headers[header.acceptLanguage] = config.headers.ssrLang ?? lang;

      return config;
    },
    (error: unknown) => Promise.reject(error),
  ];

  const mutex = new Mutex();

  const responseInterceptor = [
    (response: AxiosResponse) => response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (error: any) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== refreshTokenUrl &&
        typeof window !== "undefined"
      ) {
        if (!mutex.isLocked()) {
          await mutex.runExclusive(async () => {
            originalRequest._retry = true;

            try {
              const { token, refreshToken } = await getRefreshToken();
              storeToken(token, refreshToken);
              request.defaults.headers.common["Authorization"] =
                `Bearer ${token}`;
              return request(originalRequest);
            } catch (e) {
              console.error("Refresh token error", e);
              removeToken();
            }
          });
        } else {
          await mutex.waitForUnlock();
        }
      }

      return Promise.reject(error);
    },
  ];

  request.interceptors.request.use(...requestInterceptor);
  request.interceptors.response.use(...responseInterceptor);
};
