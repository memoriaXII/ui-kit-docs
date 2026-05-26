import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useQuotesCreate } from "@boxo/api/lounge";
import {
  Body1,
  Card,
  Footnote1,
  Stepper,
  Title1,
  Toast,
} from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { useAtom } from "jotai";
import { z } from "zod";
import { set, getHours, getMinutes } from "date-fns";
import {
  getApiErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/lib/api-error";
import { updateFirstPassengerFromQuote } from "@/lib/quote-utils";
import { getNextPageAfterBooking } from "@/lib/prebooking-utils";
import {
  getBookingDateRange,
  toApiDate,
  toApiTime,
  getTimeRangeDisplay,
} from "@/lib/booking-date-utils";
import { bookingDetailsAtom } from "@/atoms/booking";
import { quoteAtom } from "@/atoms/quote";
import { travelersDetailsAtom } from "@/atoms/travelers";
import { Layout } from "@/components/layout/layout";
import { DatePickerField } from "@/components/booking-details/date-picker-field";
import { TimePickerField } from "@/components/booking-details/time-picker-field";
import { useFullLoungeDetail } from "@/hooks/use-lounges";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import Image from "next/image";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";

const BookingDetailsPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [bookingDetails, setBookingDetails] = useAtom(bookingDetailsAtom);
  const [, setQuote] = useAtom(quoteAtom);
  const [, setTravelersDetails] = useAtom(travelersDetailsAtom);
  const { airport_id, lounge_id } = router.query as {
    airport_id: string;
    lounge_id: string;
  };

  const { data: lounge } = useFullLoungeDetail(airport_id, lounge_id);
  const { mutate: createQuote, isPending } = useQuotesCreate();

  const { minDateTime, maxDateTime } = useMemo(
    () => getBookingDateRange(lounge?.advance_booking_hours),
    [lounge?.advance_booking_hours],
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Combine selected date and time into a single timestamp
  const getBookingDateTime = (dateTs: number, timeTs: number) =>
    set(dateTs, {
      hours: getHours(timeTs),
      minutes: getMinutes(timeTs),
      seconds: 0,
      milliseconds: 0,
    }).getTime();

  const bookingDetailsSchema = z
    .object({
      booking_date: z
        .number({ required_error: t("Please select a date") })
        .nullable()
        .refine((val) => val !== null, t("Please select a date")),
      booking_time: z
        .number({ required_error: t("Please select a time") })
        .nullable()
        .refine((val) => val !== null, t("Please select a time")),
    })
    .refine(
      (data) => {
        if (data.booking_date && data.booking_time) {
          const bookingDateTime = getBookingDateTime(
            data.booking_date,
            data.booking_time,
          );
          return bookingDateTime >= minDateTime;
        }
        return true;
      },
      {
        message:
          lounge?.advance_booking_hours && lounge.advance_booking_hours > 0
            ? t("Booking required {{hours}}h in advance", {
                hours: lounge.advance_booking_hours,
              })
            : t("Selected time is in the past"),
        path: ["booking_time"],
      },
    );

  const validateForm = (): boolean => {
    try {
      bookingDetailsSchema.parse({
        booking_date: bookingDetails.booking_date,
        booking_time: bookingDetails.booking_time,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const fieldName = err.path[0] as string;
            newErrors[fieldName] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleContinue = () => {
    addHapticFeedback("medium");

    if (!validateForm()) {
      return;
    }

    createQuote(
      {
        data: {
          resource: lounge_id,
          passenger_count: bookingDetails.passenger_count,
          booking_date: toApiDate(bookingDetails.booking_date!),
          booking_time: toApiTime(bookingDetails.booking_time!),
        },
      },
      {
        onSuccess: (quote) => {
          setQuote(quote);
          setTravelersDetails((prev) => ({
            passengers: updateFirstPassengerFromQuote(
              prev.passengers,
              quote.passengers,
            ),
          }));
          const nextPage = getNextPageAfterBooking(quote);
          router.push({
            pathname: nextPage,
            query: {
              airport_id,
              lounge_id,
            },
          });
        },
        onError: (error) => {
          if (isValidationError(error)) {
            const validationErrors = getValidationErrors(error);
            if (Object.keys(validationErrors).length > 0) {
              setErrors(validationErrors);
              return;
            }
          }
          Toast.error(getApiErrorMessage(error, t("Failed to create quote")));
        },
      },
    );
  };

  const handlePassengerCountChange = (val: number | null) => {
    if (val) {
      addHapticFeedback("light");
      setBookingDetails((prev) => ({
        ...prev,
        passenger_count: val,
      }));
    }
  };

  const handleDateChange = (date: number) => {
    setBookingDetails((prev) => ({ ...prev, booking_date: date }));
  };

  const handleTimeChange = (time: number) => {
    setBookingDetails((prev) => ({ ...prev, booking_time: time }));
  };

  const clearDateError = () => {
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { booking_date, ...rest } = prev;
      return rest;
    });
  };

  const clearTimeError = () => {
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { booking_time, ...rest } = prev;
      return rest;
    });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (router.query.time_slot_error === "1") {
      validateForm();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { time_slot_error, ...restQuery } = router.query;
      router.replace(
        { pathname: router.pathname, query: restQuery },
        undefined,
        { shallow: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.time_slot_error]);

  return (
    <Layout
      navBar={{}}
      footer={{
        primaryButton: {
          text: t("Continue"),
          onClick: handleContinue,
          disabled: isPending,
          loading: isPending,
        },
      }}
      logo={
        <Image
          src={OthersLogo}
          alt=""
          width={DESKTOP_CONSTANTS.LOGO_WIDTH}
          height={DESKTOP_CONSTANTS.LOGO_HEIGHT}
        />
      }
    >
      <div className="flex flex-col gap-[16px]">
        <Title1 weight="bold" className="text-text-5 flex-1">
          {t("Booking details")}
        </Title1>
        <div className="flex flex-col gap-[8px]">
          <Card className="flex items-center justify-between bg-fill-1 shadow-[0_5px_20px_0_rgba(0,0,0,0.05)]">
            <Body1 weight="semibold">{t("Traveler(s)")}</Body1>
            <Stepper
              defaultValue={bookingDetails.passenger_count}
              onChange={handlePassengerCountChange}
              min={1}
              max={lounge?.max_passengers_per_order ?? undefined}
              theme="round"
              inputClass="!font-semibold"
              minusButton={
                <div
                  className={`flex items-center justify-center w-[28px] h-[28px] rounded-full bg-fill-2 font-semibold leading-none ${
                    bookingDetails.passenger_count === 1
                      ? "text-text-3"
                      : "text-text-5"
                  }`}
                >
                  <MinusIcon />
                </div>
              }
              addButton={
                <div className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-fill-2 text-text-5 font-semibold leading-none">
                  <PlusIcon />
                </div>
              }
            />
          </Card>
          {lounge?.child_policy && (
            <Footnote1 className="text-text-3">
              {t("Free for children age 6 and under traveling with you")}
            </Footnote1>
          )}
        </div>

        <DatePickerField
          label={t("Travel date")}
          value={bookingDetails.booking_date}
          onChange={handleDateChange}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
          error={errors.booking_date}
          onClearError={clearDateError}
        />

        <TimePickerField
          label={t("Time slot")}
          value={bookingDetails.booking_time}
          onChange={handleTimeChange}
          error={errors.booking_time}
          onClearError={clearTimeError}
          helperText={
            errors.booking_time
              ? undefined
              : bookingDetails.booking_time
                ? t("Access available {{timeRange}}", {
                    timeRange: getTimeRangeDisplay(bookingDetails.booking_time),
                  })
                : t("Access available for 30 minutes from time slot")
          }
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default BookingDetailsPage;
