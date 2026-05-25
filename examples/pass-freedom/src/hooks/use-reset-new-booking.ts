import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useCallback } from "react";
import { additionalDetailsAtom } from "@/atoms/additional-details";
import { bookingDetailsAtom } from "@/atoms/booking";
import { quoteAtom } from "@/atoms/quote";
import { travelersDetailsAtom } from "@/atoms/travelers";

/**
 * Resets state for a new booking flow.
 *
 * Booking-specific fields are always cleared so each new booking starts
 * clean and users cannot accidentally reuse stale flight details:
 *   - Flight number (transport_number)
 *   - Travel date (booking_date)
 *   - Time slot (booking_time)
 *   - Quote (server-side booking draft)
 *   - Travelers list
 *
 * Static user contact info is preserved across bookings so it can be
 * pre-filled on the additional details screen:
 *   - Email
 *   - Dial code
 *   - Mobile number
 *
 * This hook is intended to live at the template/global level and be
 * reused across pass-* miniapp projects. It should be called both
 * when starting a new booking flow and after a successful checkout.
 */
export const useResetNewBooking = () => {
  const setAdditionalDetails = useSetAtom(additionalDetailsAtom);
  const setBookingDetails = useSetAtom(bookingDetailsAtom);
  const setQuote = useSetAtom(quoteAtom);
  const setTravelersDetails = useSetAtom(travelersDetailsAtom);

  const resetNewBooking = useCallback(() => {
    setBookingDetails(RESET);
    setQuote(RESET);
    setTravelersDetails(RESET);

    setAdditionalDetails((prev) => ({
      ...prev,
      transport_number: "",
    }));
  }, [setAdditionalDetails, setBookingDetails, setQuote, setTravelersDetails]);

  return resetNewBooking;
};
