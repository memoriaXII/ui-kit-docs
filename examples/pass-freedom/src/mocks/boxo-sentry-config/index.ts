export const createSentryBuildOption = (
  overrides: Record<string, unknown> = {},
) => ({
  silent: true,
  ...overrides,
});
