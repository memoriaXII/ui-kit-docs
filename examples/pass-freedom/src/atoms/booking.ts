import { atomWithReset } from "jotai/utils";

interface BookingDetails {
  passenger_count: number;
  booking_date: number | undefined;
  booking_time: number | undefined;
}

export const bookingDetailsAtom = atomWithReset<BookingDetails>({
  passenger_count: 1,
  booking_date: undefined,
  booking_time: undefined,
});
