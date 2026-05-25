import { useResetNewBooking } from "@/hooks/use-reset-new-booking";

/**
 * Called after a checkout completes successfully.
 *
 * Delegates to {@link useResetNewBooking} so post-purchase cleanup
 * follows the same template/global rules: booking-specific fields
 * (flight number, date, time, quote, travelers) are cleared, while
 * static user contact info (email, dial code, mobile number) is
 * preserved so it can be pre-filled on the next booking.
 */
export const useResetCheckoutState = () => useResetNewBooking();
