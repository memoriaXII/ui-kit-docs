import type { RouteType, Quote, QuotePassenger } from "@boxo/api/lounge";
import { parse } from "date-fns";
import { toDisplayDate, getTimeRangeDisplay } from "@/lib/booking-date-utils";

interface Passenger {
  first_name: string;
  last_name: string;
}

export const updateFirstPassengerFromQuote = (
  existingPassengers: Passenger[],
  quotePassengers: readonly QuotePassenger[] | undefined,
): Passenger[] => {
  const first = quotePassengers?.[0];
  if (!first) return existingPassengers;

  const newPassenger: Passenger = {
    first_name: first.first_name,
    last_name: first.last_name,
  };

  if (existingPassengers.length > 0) {
    return existingPassengers.map((p, i) => (i === 0 ? newPassenger : p));
  }

  return [newPassenger];
};

export const formatRouteTypes = (routeTypes: readonly RouteType[]): string => {
  return routeTypes.map((rt) => rt.label).join(", ");
};

export const formatBookingDateTime = (quote?: Quote | null): string => {
  if (!quote?.booking_date || !quote?.booking_time) return "";

  try {
    const date = parse(quote.booking_date, "yyyy-MM-dd", new Date());
    const timeStr = quote.booking_time.slice(0, 5);
    const [hours, minutes] = timeStr.split(":").map(Number);

    const startTime = new Date(date);
    startTime.setHours(hours ?? 0, minutes ?? 0, 0, 0);

    const dateFormatted = toDisplayDate(date.getTime());
    const timeRange = getTimeRangeDisplay(startTime.getTime());

    return `${dateFormatted} • ${timeRange}`;
  } catch {
    return "";
  }
};

export const getAirportInfo = (quote?: Quote | null) => {
  if (!quote?.resource?.hub) return { name: "", terminal: "", flagUrl: "" };

  const hub = quote.resource.hub;
  return {
    name: `${hub.title} (${hub.iata})`,
    terminal: [
      quote.resource.terminal,
      formatRouteTypes(quote.resource.route_types),
    ]
      .filter(Boolean)
      .join(" • "),
    flagUrl: hub.country?.image || "",
  };
};
