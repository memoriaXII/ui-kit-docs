/**
 * Mock for @boxo/api — only the surface used by this demo.
 *
 * Real implementations live in the boxo-miniapps monorepo (orval-generated
 * from an OpenAPI spec). For demo purposes we expose minimal shapes that
 * satisfy the TypeScript types and return static fixtures.
 */

// Re-export so consumers that historically imported `safeWindow` from
// `@boxo/api` (a few `lib/*` helpers in this demo do) keep working.
export { safeWindow } from "../esim-util";

export const TokenKey = {
  Token: "token",
  RefreshToken: "refresh_token",
} as const;

export const refreshTokenUrl = "/api/v1/auth/token/refresh/";

let tokenStore: { token: string | null; refreshToken: string | null } = {
  token: "demo-token",
  refreshToken: "demo-refresh-token",
};

export const hasToken = () => Boolean(tokenStore.token);

export const storeToken = (token: string, refreshToken?: string) => {
  tokenStore = { token, refreshToken: refreshToken ?? tokenStore.refreshToken };
};

export const removeToken = () => {
  tokenStore = { token: null, refreshToken: null };
};

type MockResponse<T> = { data: T; status: number; headers: Record<string, string> };

const ok = <T>(data: T): Promise<MockResponse<T>> =>
  Promise.resolve({ data, status: 200, headers: {} });

/**
 * Axios-shaped stub. The real client is an axios instance with interceptors;
 * for the demo every verb just returns an empty payload (or the request body).
 */
export const request = Object.assign(
  async <T = unknown>(_args?: unknown): Promise<T> =>
    undefined as unknown as T,
  {
    get: <T = unknown>(_url: string, _config?: unknown) =>
      ok<T>(([] as unknown) as T),
    post: <T = unknown>(_url: string, body?: unknown, _config?: unknown) =>
      ok<T>((body ?? {}) as T),
    put: <T = unknown>(_url: string, body?: unknown, _config?: unknown) =>
      ok<T>((body ?? {}) as T),
    patch: <T = unknown>(_url: string, body?: unknown, _config?: unknown) =>
      ok<T>((body ?? {}) as T),
    delete: <T = unknown>(_url: string, _config?: unknown) =>
      ok<T>(({} as unknown) as T),
    defaults: { headers: { common: {} as Record<string, string> } },
    // Axios-shaped interceptor manager. The demo never actually intercepts
    // anything (every verb is mocked above), so use/eject/clear are no-ops
    // that just satisfy the call sites in `lib/overwriteRequest.ts`.
    interceptors: {
      request: {
        use: (..._args: unknown[]) => 0,
        eject: (_id: number) => undefined,
        clear: () => undefined,
      },
      response: {
        use: (..._args: unknown[]) => 0,
        eject: (_id: number) => undefined,
        clear: () => undefined,
      },
    },
  },
);

export const withLanguageHeader = (
  locale?: string,
): Record<string, string> =>
  locale ? { "Accept-Language": locale } : {};
