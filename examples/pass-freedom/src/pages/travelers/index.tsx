import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useQuotesPartialUpdate } from "@boxo/api/lounge";
import { Footnote1, Input, Title1, Title3, Toast } from "@appboxo/ui-kit";
import { addHapticFeedback } from "@boxo/esim-util";
import { useAtom, useAtomValue } from "jotai";
import { z } from "zod";
import { get, omit, times } from "lodash-es";
import { bookingDetailsAtom } from "@/atoms/booking";
import { travelersDetailsAtom } from "@/atoms/travelers";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import {
  getApiErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/lib/api-error";
import { quoteAtom } from "@/atoms/quote";

const nameRegex = /^[A-Za-zÀ-ÿĀ-žḀ-ỿ' ,.\-/()]+$/;

const TravelersPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [savedQuote, setQuote] = useAtom(quoteAtom);
  const quoteId = savedQuote?.id;
  const { passenger_count } = useAtomValue(bookingDetailsAtom);
  const [travelersDetails, setTravelersDetails] = useAtom(travelersDetailsAtom);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: updateQuote, isPending } = useQuotesPartialUpdate();

  const travelerSchema = z.object({
    first_name: z
      .string()
      .regex(nameRegex, t("Please enter a valid first name")),
    last_name: z.string().regex(nameRegex, t("Please enter a valid last name")),
  });

  const getPassengerValue = (
    index: number,
    field: "first_name" | "last_name",
  ): string => get(travelersDetails.passengers, [index, field], "");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    times(passenger_count, (index) => {
      // Skip validation for Traveler 1 (index 0) as it's not editable
      if (index === 0) return;

      const passenger = {
        first_name: getPassengerValue(index, "first_name"),
        last_name: getPassengerValue(index, "last_name"),
      };
      try {
        travelerSchema.parse(passenger);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            if (err.path?.[0]) {
              newErrors[`${index}_${err.path[0]}`] = err.message;
            }
          });
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePassengerChange = (
    index: number,
    field: "first_name" | "last_name",
    value: string,
  ) => {
    setErrors((prev) => omit(prev, `${index}_${field}`));

    setTravelersDetails((prev) => {
      const updated = [...prev.passengers];
      while (updated.length <= index) {
        updated.push({ first_name: "", last_name: "" });
      }
      updated[index] = {
        first_name:
          field === "first_name"
            ? value
            : get(updated, [index, "first_name"], ""),
        last_name:
          field === "last_name"
            ? value
            : get(updated, [index, "last_name"], ""),
      };
      return { passengers: updated };
    });
  };

  const handleContinue = () => {
    addHapticFeedback("medium");

    if (!validateForm()) {
      return;
    }

    const passengers = times(passenger_count, (index) => ({
      first_name: getPassengerValue(index, "first_name"),
      last_name: getPassengerValue(index, "last_name"),
    }));

    updateQuote(
      {
        id: quoteId!,
        data: { passengers },
      },
      {
        onSuccess: (quote) => {
          setQuote(quote);
          router.push({
            pathname: "/checkout",
            query: router.query,
          });
        },
        onError: (error) => {
          if (isValidationError(error)) {
            const validationErrors = getValidationErrors(error);
            if (Object.keys(validationErrors).length > 0) {
              // Transform API field names (e.g., "passengers.0.first_name") to local format (e.g., "0_first_name")
              const transformedErrors: Record<string, string> = {};
              Object.entries(validationErrors).forEach(([field, message]) => {
                const match = field.match(/^passengers\.(\d+)\.(\w+)$/);
                if (match) {
                  transformedErrors[`${match[1]}_${match[2]}`] = message;
                } else {
                  transformedErrors[field] = message;
                }
              });
              setErrors(transformedErrors);
              return;
            }
          }
          Toast.error(getApiErrorMessage(error, t("Failed to update quote")));
        },
      },
    );
  };

  const getTravelerTitle = (index: number) => {
    if (index === 0) {
      return t("Traveler 1 (You)");
    }
    return t("Traveler {{number}}", { number: index + 1 });
  };

  return (
    <Layout
      navBar={{}}
      customHeader={
        <div className="mb-[8px]">
          <Title1 weight="bold" className="text-text-5">
            {t("Travelers")}
          </Title1>
        </div>
      }
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
      <div className="flex flex-col gap-[24px]">
        <Footnote1 className="text-text-3">
          {t("Travelers' names must match their passport or ID.")}
          {"\n"}
          {savedQuote?.resource.child_policy}
        </Footnote1>

        {times(passenger_count, (index) => (
          <div key={index} className="flex flex-col gap-[16px]">
            <Title3 weight="semibold">{getTravelerTitle(index)}</Title3>

            <div className="flex flex-col gap-[8px]">
              <Footnote1 className="text-text-3">{t("First name")}</Footnote1>
              <Input
                value={getPassengerValue(index, "first_name")}
                placeholder={t("Enter first name")}
                hasError={!!errors[`${index}_first_name`]}
                disabled={index === 0}
                onChange={(_, value) =>
                  handlePassengerChange(index, "first_name", value)
                }
              />
              {errors[`${index}_first_name`] && (
                <Footnote1 className="text-danger-6">
                  {errors[`${index}_first_name`]}
                </Footnote1>
              )}
            </div>

            <div className="flex flex-col gap-[8px]">
              <Footnote1 className="text-text-3">{t("Last name")}</Footnote1>
              <Input
                value={getPassengerValue(index, "last_name")}
                placeholder={t("Enter last name")}
                hasError={!!errors[`${index}_last_name`]}
                disabled={index === 0}
                onChange={(_, value) =>
                  handlePassengerChange(index, "last_name", value)
                }
              />
              {errors[`${index}_last_name`] && (
                <Footnote1 className="text-danger-6">
                  {errors[`${index}_last_name`]}
                </Footnote1>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default TravelersPage;
