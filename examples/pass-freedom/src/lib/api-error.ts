import { QuoteTimeSlotUnavailableException } from "@boxo/api/lounge";

interface ApiErrorData {
  code?: string;
  message?: string;
  details?: unknown;
}

interface AxiosErrorLike {
  response?: {
    data?: ApiErrorData;
  };
  message?: string;
}

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  const axiosError = error as AxiosErrorLike | undefined;

  const apiMessage = axiosError?.response?.data?.message;
  if (apiMessage) {
    return apiMessage;
  }

  return fallbackMessage;
};

const VALIDATION_ERROR_CODE = "VALIDATION_ERROR";

export const isValidationError = (error: unknown): boolean => {
  const axiosError = error as AxiosErrorLike | undefined;
  return axiosError?.response?.data?.code === VALIDATION_ERROR_CODE;
};

export const getValidationErrors = (error: unknown): Record<string, string> => {
  const axiosError = error as AxiosErrorLike | undefined;
  const details = axiosError?.response?.data?.details;

  if (!details || !Array.isArray(details)) {
    return {};
  }

  const errors: Record<string, string> = {};
  details.forEach((detail) => {
    if (detail.field && detail.message) {
      errors[detail.field] = detail.message;
    }
  });

  return errors;
};

const TIME_SLOT_UNAVAILABLE_ERROR_CODE = "QUOTE_TIME_SLOT_UNAVAILABLE";

export const isTimeSlotUnavailableError = (
  errorData: unknown,
): errorData is QuoteTimeSlotUnavailableException => {
  if (!errorData || typeof errorData !== "object") {
    return false;
  }
  const data = errorData as QuoteTimeSlotUnavailableException;
  return data.code === TIME_SLOT_UNAVAILABLE_ERROR_CODE;
};
