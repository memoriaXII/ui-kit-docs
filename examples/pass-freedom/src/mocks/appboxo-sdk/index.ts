/**
 * Mock for @appboxo/js-sdk — minimal stub.
 */

const appboxo = {
  init: () => undefined,
  ready: async () => undefined,
  close: () => undefined,
  openUrl: (url: string) => {
    if (typeof window !== "undefined") window.open(url, "_blank");
  },
  share: async () => undefined,
  getDeviceInfo: async () => ({ model: "Demo", os: "iOS" }),
  requestLocation: async () => ({ latitude: 0, longitude: 0 }),
  onEvent: (_name: string, _cb: (...args: unknown[]) => void) => () => undefined,
};

export default appboxo;
