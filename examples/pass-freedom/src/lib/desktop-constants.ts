/**
 * Desktop layout constants
 * These values are used across the desktop app for consistent sizing
 * They match the CSS variables defined in global.css
 */
export const DESKTOP_CONSTANTS = {
  /** Content area width (e.g., Layout component) */
  CONTENT_WIDTH: 400,
  /** Logo/Image width */
  LOGO_WIDTH: 400,
  /** Logo/Image height */
  LOGO_HEIGHT: 240,
  /** Logo aspect ratio (width:height) */
  LOGO_ASPECT_RATIO: "5 / 3" as const, // 400:240 = 5:3
} as const;
