import type { Quote } from "@boxo/api/lounge";

const ADDITIONAL_DETAILS_FIELDS = [
  "EMAIL",
  "PHONE_NUMBER",
  "CALLING_CODE",
  "TRANSPORT_NUMBER",
] as const;

export type PrebookingRequiredInfo = (typeof ADDITIONAL_DETAILS_FIELDS)[number];

export const isFieldRequired = (
  prebookingRequiredInfo: readonly string[] | undefined,
  field: string,
): boolean => {
  if (!prebookingRequiredInfo) return false;
  return prebookingRequiredInfo.includes(field);
};

export const hasAdditionalDetailsRequired = (
  prebookingRequiredInfo: readonly string[] | undefined,
): boolean => {
  if (!prebookingRequiredInfo || prebookingRequiredInfo.length === 0)
    return false;
  return prebookingRequiredInfo.some((field) =>
    ADDITIONAL_DETAILS_FIELDS.includes(field as PrebookingRequiredInfo),
  );
};

export const getNextPageAfterBooking = (
  quote: Quote,
): "/additional-details" | "/travelers" | "/checkout" => {
  const prebookingInfo = quote.resource?.prebooking_required_info;

  if (hasAdditionalDetailsRequired(prebookingInfo)) {
    return "/additional-details";
  }

  const isSingle = quote.passenger_count === 1;
  return isSingle ? "/checkout" : "/travelers";
};

export const isPhoneRequired = (
  prebookingRequiredInfo: readonly string[] | undefined,
): boolean => {
  return (
    isFieldRequired(prebookingRequiredInfo, "PHONE_NUMBER") ||
    isFieldRequired(prebookingRequiredInfo, "CALLING_CODE")
  );
};
