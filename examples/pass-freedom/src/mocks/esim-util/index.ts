/**
 * Mock for @boxo/esim-util — covers only what this demo touches.
 */

export const HELP_REVALIDATE = 60;

export const initEruda = () => {
  // no-op in demo
};

export const setMenuButtonVisibility = (_visible: boolean) => {
  // no-op in demo
};

export const PUBLIC_PATHS = [
  "/",
  "/introduction",
  "/help",
  "/help/[id]",
] as const;

// --- Browser / host helpers ---

export const safeWindow =
  typeof window !== "undefined" ? window : (undefined as unknown as Window);

export const isInIframe = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768;
};

export const isMobileDevice = (): boolean => !isDesktop();

// --- Host bridge stubs ---

export const addHapticFeedback = (_style?: "light" | "medium" | "heavy") => {
  // no-op
};

export const changeStatusBarColor = (_color: string) => {
  // no-op
};

export const exit = async () => {
  // no-op
};

export const login = async () => ({
  token: "demo-token",
  refreshToken: "demo-refresh-token",
});

export const pay = async (
  _payload?: unknown,
): Promise<{ status: "success" | "cancelled" | "failed" }> => ({
  status: "success",
});

export const getDeviceInfo = async () => ({
  model: "Demo Device",
  os: "iOS",
  osVersion: "17.0",
  isSupportESim: true,
});

export const getLocation = async () => ({ latitude: 0, longitude: 0 });

// --- CSS helpers ---

export const getCSSVariableValue = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

// --- Introduction flag ---

const INTRO_FLAG = "boxo-introduction-shown";

export const hasIntroductionScreenDisplayedFlag = (): boolean => {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(INTRO_FLAG) === "1";
  } catch {
    return true;
  }
};

export const setIntroductionScreenDisplayedFlag = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INTRO_FLAG, "1");
  } catch {
    // ignore
  }
};

// --- Universal bridge ---

export const universalBridge = {
  login,
  exit,
  getDeviceInfo,
  getInitData: async () => ({
    app_id: "demo",
    client_id: "demo",
    payload: "",
    data: {},
  }),
  shareFile: async () => {
    // no-op
  },
  setMenuButtonVisibility: () => {
    // no-op
  },
  sendCustomEvent: () => {
    // no-op
  },
  getTheme: async () => ({ primaryColor: undefined as string | undefined }),
  addHapticFeedback,
  changeStatusBarColor,
};

// --- Storage ---

export const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

// --- Tracking ---

export const track = (_event: string, _payload?: unknown) => {
  // no-op
};

// --- Misc utilities ---

export const onceFn = <Args extends unknown[], R>(fn: (...args: Args) => R) => {
  let called = false;
  let result: R;
  return (...args: Args): R => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};

// --- Types occasionally re-exported from this module ---

export interface PaymentData {
  amount: number;
  currency: string;
  description?: string;
}

export interface GeodataParams {
  latitude: number;
  longitude: number;
}
