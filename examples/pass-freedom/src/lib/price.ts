const parseAmount = (price: string | number | null | undefined): number => {
  if (price === undefined || price === null) return NaN;
  const amount = typeof price === "string" ? parseFloat(price) : price;
  return amount;
};

/**
 * Format an amount with the API-provided currency code (e.g. "KZT" → "11 500 ₸").
 * Falls back to the raw number when the currency is missing.
 */
export const formatPrice = (
  price: string | number | null | undefined,
  currency: string | null | undefined,
): string => {
  const amount = parseAmount(price);
  if (isNaN(amount)) return "";

  if (!currency) {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)} ${currency}`;
  }
};

/**
 * Format discount amount as negative currency (e.g. "-40 €", "-1 000 ₸").
 */
export const formatDiscount = (
  price: string | number | null | undefined,
  currency: string | null | undefined,
): string => {
  const amount = parseAmount(price);
  if (isNaN(amount) || amount <= 0) return "";
  return `-${formatPrice(amount, currency)}`;
};

/**
 * Cashback percent for this merchant.
 *
 * TODO: remove once the lounge API returns cashback_info in PassCheckout
 * (the same CashbackInfo shape that already exists in esim.yaml).
 * Temporarily hardcoded here because the backend has not yet implemented
 * the field and the env variable is not provisioned on the server.
 */
export const CASHBACK_PERCENT: number = 3;

/** Compute cashback for a given total. Returns 0 when CASHBACK_PERCENT is unset. */
export const computeCashback = (total: number): number => {
  if (!CASHBACK_PERCENT || total <= 0) return 0;
  return Math.round((total * CASHBACK_PERCENT) / 100);
};
