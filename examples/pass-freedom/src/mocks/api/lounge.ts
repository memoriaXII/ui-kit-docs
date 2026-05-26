/**
 * Mock for @boxo/api/lounge — covers only what this demo touches.
 * Types are intentionally loose; this is a runnable showcase, not a SDK.
 */

import type { UseQueryResult } from "@tanstack/react-query";

// ---------- Types ----------

export type RouteType = "departure" | "arrival" | "transit";

export interface Voucher {
  code: string;
  discount_amount?: number;
  description?: string;
}

export interface Lounge {
  id: number | string;
  name: string;
  image?: string;
  airport_name?: string;
  airport_iata?: string;
  terminal?: string;
  rating?: number;
  reviews_count?: number;
  amenities?: LoungeAmenity[];
  description?: string;
  open_hours?: string;
  price_from?: number;
  currency?: string;
  is_free?: boolean;
  hub?: Hub;
}

export interface LoungeAmenity {
  id: number | string;
  name: string;
  icon?: string;
}

export interface Hub {
  id: number | string;
  name: string;
  iata_code: string;
  city?: string;
  // Real production `@boxo/api/lounge` returns this as `{ name, image }`
  // (the flag CDN URL); legacy types had it as a string. Use the object
  // shape so `airport-list-item.tsx`'s `airport.country.image` access
  // actually resolves to a real flag in the standalone demo.
  country?: { name: string; image: string };
  lounges_count?: number;
}

export const HubsListResourceType = {
  Lounge: "lounge",
  FastTrack: "fast_track",
  FAST_TRACK: "fast_track",
  LOUNGE: "lounge",
} as const;
export type HubsListResourceType =
  (typeof HubsListResourceType)[keyof typeof HubsListResourceType];

export const HelpCenterListResourceType = HubsListResourceType;
export type HelpCenterListResourceType = HubsListResourceType;

export const ModuleTypeEnum = {
  FAST_TRACK: "fast_track",
  LOUNGE: "lounge",
} as const;
export type ModuleTypeEnum = (typeof ModuleTypeEnum)[keyof typeof ModuleTypeEnum];

export const getMembershipsPromotionRetrieveQueryKey = (
  _params?: unknown,
): unknown[] => ["mock", "memberships", "promotion"];

export const useOrdersPassCreate = () => ({
  mutateAsync: async (payload: unknown) =>
    ({ id: "demo-order", status: "succeeded", ...((payload as object) ?? {}) }),
  isPending: false,
  isError: false,
  error: null as Error | null,
});

export const useOrdersPassCheckoutCreate = useOrdersPassCreate;

export const HubsResourcesListResourceType = HubsListResourceType;
export type HubsResourcesListResourceType = HubsListResourceType;

export const useHubsResourcesList = (_args?: unknown, _opts?: unknown) =>
  mockQuery(sampleLounges);

export const useResourcesRetrieve = (id?: string | number, _opts?: unknown) =>
  mockQuery({
    ...(sampleLounges.find((l) => String(l.id) === String(id)) ??
      sampleLounges[0]),
    route_types: sampleRouteTypes,
    type: "lounge",
    title: (sampleLounges[0] as { name?: string }).name ?? "Lounge",
  });

export const useOrdersRetrieve = (id?: string | number, _opts?: unknown) =>
  mockQuery({
    id: String(id ?? "demo-order"),
    status: "succeeded",
    payment_status: "paid",
    fulfillment_status: "fulfilled",
    quote: makeQuoteShape(),
  });

export const FulfillmentStatusEnum = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  FAILED: "failed",
} as const;
export type FulfillmentStatusEnum =
  (typeof FulfillmentStatusEnum)[keyof typeof FulfillmentStatusEnum];

export const PaymentStatusEnum = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
} as const;
export type PaymentStatusEnum =
  (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];

export const hubsRetrieve = async (id?: string | number) =>
  sampleHubs.find((h) => String(h.id) === String(id)) ?? sampleHubs[0];

export interface Country {
  id: string;
  code: string;
  title: string;
  name: string;
  iso_code: string;
  dial_code: string;
  image: string;
  flag?: string;
}

// Demo flag URLs use flagcdn.com — a free public CDN for country flags
// keyed by ISO 3166-1 alpha-2 codes. Production pass-freedom serves flags
// from its own DragonPass CMS; for the standalone mock UI showcase we
// point at the public CDN so the avatars actually render instead of
// showing broken-image placeholders.
const flagUrl = (code: string) =>
  `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const makeCountry = (
  code: string,
  title: string,
  dial_code: string,
): Country => ({
  id: code.toLowerCase(),
  code,
  title,
  name: title,
  iso_code: code,
  dial_code,
  image: flagUrl(code),
  flag: flagUrl(code),
});

const sampleCountries: Country[] = [
  makeCountry("US", "United States", "+1"),
  makeCountry("GB", "United Kingdom", "+44"),
  makeCountry("AE", "United Arab Emirates", "+971"),
  makeCountry("SG", "Singapore", "+65"),
  makeCountry("KZ", "Kazakhstan", "+7"),
  makeCountry("RU", "Russia", "+7"),
];

export const countriesList = async (_params?: unknown, _opts?: unknown) =>
  sampleCountries;

export const useCountriesList = (_params?: unknown, _opts?: unknown) =>
  mockQuery(sampleCountries);

export interface EPass {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  benefits?: string[];
  remaining_entries?: number;
  total_entries?: number;
  expires_at?: string;
  is_free?: boolean;
  price?: number;
  currency?: string;
}

export interface QuotePassenger {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
}

export interface Quote {
  id: string;
  lounge?: Lounge;
  pass?: EPass;
  route_type?: RouteType;
  arrival_time?: string;
  departure_time?: string;
  passengers?: QuotePassenger[];
  total_amount?: number;
  currency?: string;
  voucher?: Voucher | null;
  status?: "draft" | "confirmed" | "cancelled";
}

export interface User {
  id: string | number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export class QuoteTimeSlotUnavailableException extends Error {
  constructor(message = "Time slot unavailable") {
    super(message);
    this.name = "QuoteTimeSlotUnavailableException";
  }
}

export interface HelpCenterCategory {
  id: string | number;
  title: string;
  description?: string;
  icon?: string;
}

export interface HelpCenterArticle {
  id: string | number;
  title: string;
  body: string;
  category_id?: string | number;
}

export type HelpCenterArticleList = HelpCenterArticle[];

// ---------- Fixtures ----------

const sampleHubs: Hub[] = [
  {
    id: 1,
    name: "London Heathrow",
    iata_code: "LHR",
    city: "London",
    country: { name: "United Kingdom", image: flagUrl("GB") },
    lounges_count: 12,
  },
  {
    id: 2,
    name: "Dubai International",
    iata_code: "DXB",
    city: "Dubai",
    country: { name: "United Arab Emirates", image: flagUrl("AE") },
    lounges_count: 18,
  },
  {
    id: 3,
    name: "Singapore Changi",
    iata_code: "SIN",
    city: "Singapore",
    country: { name: "Singapore", image: flagUrl("SG") },
    lounges_count: 9,
  },
  {
    id: 4,
    name: "Charles de Gaulle Airport",
    iata_code: "CDG",
    city: "Paris",
    country: { name: "France", image: flagUrl("FR") },
    lounges_count: 14,
  },
  {
    id: 5,
    name: "Phuket International Airport",
    iata_code: "HKT",
    city: "Phuket",
    country: { name: "Thailand", image: flagUrl("TH") },
    lounges_count: 4,
  },
];

const sampleLounges: Lounge[] = [
  {
    id: 101,
    name: "Plaza Premium Lounge",
    airport_name: "London Heathrow",
    airport_iata: "LHR",
    terminal: "Terminal 5",
    rating: 4.7,
    reviews_count: 1284,
    price_from: 45,
    currency: "USD",
    open_hours: "05:00 - 23:00",
    description:
      "Relax in style before your flight with comfortable seating, complimentary food and beverages, and Wi-Fi.",
    amenities: [
      { id: 1, name: "Wi-Fi" },
      { id: 2, name: "Showers" },
      { id: 3, name: "Buffet" },
      { id: 4, name: "Power outlets" },
    ],
    hub: sampleHubs[0],
  },
  {
    id: 102,
    name: "Marhaba Lounge",
    airport_name: "Dubai International",
    airport_iata: "DXB",
    terminal: "Terminal 3",
    rating: 4.5,
    reviews_count: 892,
    price_from: 55,
    currency: "USD",
    open_hours: "24 hours",
    description:
      "Five-star comfort with premium dining, shower facilities and quiet zones.",
    amenities: [
      { id: 1, name: "Wi-Fi" },
      { id: 2, name: "Showers" },
      { id: 5, name: "Bar" },
    ],
    hub: sampleHubs[1],
  },
];

const sampleUser: User = {
  id: 1,
  first_name: "Demo",
  last_name: "User",
  email: "demo@freedom.example",
  phone: "+1 555 010 1010",
};

const sampleRouteTypes = [
  { value: "departure", label: "Departure" },
  { value: "arrival", label: "Arrival" },
] as const;

const makeQuoteShape = (overrides: Record<string, unknown> = {}) => ({
  id: "demo-quote-id",
  booking_date: "2026-06-15",
  booking_time: "10:00:00",
  passenger_count: 1,
  resource: {
    id: 101,
    title: "Plaza Premium Lounge",
    type: "lounge",
    route_types: sampleRouteTypes,
    terminal: "Terminal 5",
    hub: {
      id: 1,
      title: "London Heathrow",
      iata: "LHR",
      iata_code: "LHR",
      city: "London",
      country: { name: "United Kingdom", image: flagUrl("GB") },
    },
  },
  ...overrides,
});

const samplePasses: EPass[] = [
  {
    id: "pass-elite",
    title: "Elite Pass",
    description: "Unlimited lounge visits worldwide",
    benefits: [
      "Unlimited visits",
      "Up to 2 guests",
      "Fast-track security",
      "24/7 support",
    ],
    remaining_entries: 999,
    total_entries: 999,
    is_free: false,
    price: 399,
    currency: "USD",
    // Production passes embed a quote — preserve the shape so sortPasses works
    ...({ quote: makeQuoteShape() } as Partial<EPass>),
  },
  {
    id: "pass-standard",
    title: "Standard Pass",
    description: "10 lounge visits per year",
    benefits: ["10 visits / year", "1 guest per visit", "Email support"],
    remaining_entries: 7,
    total_entries: 10,
    is_free: false,
    price: 149,
    currency: "USD",
    ...({
      quote: makeQuoteShape({
        booking_date: "2026-07-22",
        booking_time: "14:30:00",
        resource: {
          id: 102,
          title: "Marhaba Lounge",
          type: "lounge",
          route_types: sampleRouteTypes,
          hub: {
            id: 2,
            title: "Dubai International",
            iata: "DXB",
            iata_code: "DXB",
            city: "Dubai",
            country: { name: "United Arab Emirates", image: flagUrl("AE") },
          },
        },
      }),
    } as Partial<EPass>),
  },
];

// ---------- React-Query-shaped hooks ----------

type MockQuery<T> = Pick<
  UseQueryResult<T>,
  "data" | "isLoading" | "isFetching" | "isError" | "error" | "refetch"
> & { status: "success" };

const mockQuery = <T>(data: T): MockQuery<T> => ({
  data,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: null,
  status: "success",
  refetch: (async () => ({ data })) as MockQuery<T>["refetch"],
});

// Note: real orval hooks return the data array directly (or, sometimes, a
// paginated object). The pass-freedom code expects the bare array, so that's
// what we return here.

export const useHubsList = (_args?: unknown, _opts?: unknown) =>
  mockQuery(sampleHubs);

export const usePassesList = (_args?: unknown, _opts?: unknown) =>
  mockQuery(samplePasses);

export const usePassesRetrieve = (id?: string | number, _opts?: unknown) =>
  mockQuery(samplePasses.find((p) => String(p.id) === String(id)) ?? samplePasses[0]);

export const useAccountsMeRetrieve = (_opts?: unknown) => mockQuery(sampleUser);

export const useMembershipsPromotionRetrieve = (_opts?: unknown) =>
  mockQuery({ active: false, code: null });

export const useQuotesCreate = () => ({
  mutateAsync: async (payload: unknown) =>
    ({ id: "demo-quote", ...((payload as object) ?? {}) }) as Quote,
  isPending: false,
  isError: false,
  error: null as Error | null,
});

export const useQuotesPartialUpdate = () => ({
  mutateAsync: async (payload: { id: string; data?: unknown }) =>
    ({ id: payload.id, ...(payload.data as object) }) as Quote,
  isPending: false,
  isError: false,
  error: null as Error | null,
});

// Re-export api token helpers under the lounge entry as some callers expect them
export { hasToken, storeToken, request, withLanguageHeader } from "./index";
