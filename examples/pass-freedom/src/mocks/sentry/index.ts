/**
 * Mock for @sentry/nextjs — no-op everything.
 */

type Severity = "fatal" | "error" | "warning" | "info" | "debug";

export const init = (_opts?: unknown) => undefined;
export const captureException = (err: unknown): string => {
  if (typeof console !== "undefined") {
    console.error("[sentry mock]", err);
  }
  return "demo-event-id";
};
export const captureMessage = (
  msg: string,
  _level?: Severity,
): string => {
  if (typeof console !== "undefined") {
    console.log("[sentry mock]", msg);
  }
  return "demo-event-id";
};
export const setUser = (_user?: unknown) => undefined;
export const setTag = (_key: string, _value: unknown) => undefined;
export const setContext = (_key: string, _value: unknown) => undefined;
export const addBreadcrumb = (_breadcrumb: unknown) => undefined;
export const withScope = (cb: (scope: unknown) => void) => cb({});
export const flush = async (_ms?: number) => true;

export const captureUnderscoreErrorException = (_ctx?: unknown) => undefined;
export const ErrorBoundary = ({
  children,
}: {
  children?: unknown;
  fallback?: unknown;
}) => children as unknown;
export const Replay = class {};
export const replayIntegration = () => ({});
export const browserTracingIntegration = () => ({});
