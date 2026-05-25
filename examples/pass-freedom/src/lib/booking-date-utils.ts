import { format, addHours, addMinutes, addMonths } from "date-fns";

export type PickerOption<T> = { label: string; value: T };

/**
 * Get the min and max booking date range
 * Limit to 6 months in advance as per TECH-16857
 */
export const getBookingDateRange = (
  advanceHours: number | null | undefined,
) => {
  const now = new Date();
  const minDateTime = addHours(now, advanceHours ?? 0).getTime();
  const maxDateTime = addMonths(minDateTime, 6).getTime();
  return { minDateTime, maxDateTime };
};

/**
 * Format timestamp for display as date
 */
export const toDisplayDate = (ts: number): string => format(ts, "dd MMM yyyy");

/**
 * Format timestamp for display as time (24-hour format)
 */
export const toDisplayTime = (ts: number): string => format(ts, "HH:mm");

/**
 * Get time range string for access availability (start time + 30 minutes)
 * e.g., "07:30 - 08:00"
 */
export const getTimeRangeDisplay = (ts: number): string => {
  const startTime = format(ts, "HH:mm");
  const endTime = format(addMinutes(ts, 30), "HH:mm");
  return `${startTime} - ${endTime}`;
};

/**
 * Format timestamp for API as date (yyyy-MM-dd)
 */
export const toApiDate = (ts: number): string => format(ts, "yyyy-MM-dd");

/**
 * Format timestamp for API as time (HH:mm)
 */
export const toApiTime = (ts: number): string => format(ts, "HH:mm");
