import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  countriesList,
  useQuotesPartialUpdate,
  type PatchedQuoteUpdateRequest,
} from "@boxo/api/lounge";
import { withLanguageHeader } from "@boxo/api";
import {
  Footnote1,
  Input,
  Title1,
  DialCodeSelector,
  Toast,
  useDesktopDetection,
  DownIcon,
  type CountryData,
} from "@appboxo/ui-kit";
import { addHapticFeedback, HELP_REVALIDATE } from "@boxo/esim-util";
import { useAtom } from "jotai";
import { z } from "zod";
import { getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { additionalDetailsAtom } from "@/atoms/additional-details";
import { Layout } from "@/components/layout/layout";
import {
  getApiErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/lib/api-error";
import { ArcoDialCodeSelect } from "@/components/additional-details/arco-dial-code-select";
import { quoteAtom } from "@/atoms/quote";
import { travelersDetailsAtom } from "@/atoms/travelers";
import { updateFirstPassengerFromQuote } from "@/lib/quote-utils";
import Image from "next/image";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import { useLoungeAuthContext } from "@/lib/with-lounge-auth";

// Flight number format: 2 letters followed by 1-4 digits (e.g., EK123, UA1234)
const FLIGHT_NUMBER_REGEX = /^[A-Z]{2}\d{1,4}$/;

const parsePhoneForForm = (
  phone: string,
  availableDialCodes: string[],
): { dial_code: string; mobile_number: string } => {
  const normalized = phone.replace(/[^\d+]/g, "");

  if (!normalized) {
    return { dial_code: "", mobile_number: "" };
  }

  if (!normalized.startsWith("+")) {
    return { dial_code: "", mobile_number: normalized };
  }

  const matchedDialCode = availableDialCodes.find((dialCode) =>
    normalized.startsWith(dialCode),
  );

  if (!matchedDialCode) {
    return { dial_code: "", mobile_number: normalized.replace(/^\+/, "") };
  }

  return {
    dial_code: matchedDialCode,
    mobile_number: normalized.slice(matchedDialCode.length),
  };
};

const AdditionalDetailsPage = ({
  countriesData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  const isDesktop = useDesktopDetection();
  const { userInfo } = useLoungeAuthContext();
  const [savedQuote, setQuote] = useAtom(quoteAtom);
  const [additionalDetails, setAdditionalDetails] = useAtom(
    additionalDetailsAtom,
  );
  const [, setTravelersDetails] = useAtom(travelersDetailsAtom);
  const quoteId = savedQuote?.id;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialCodeVisible, setDialCodeVisible] = useState(false);
  const { mutate: updateQuote, isPending } = useQuotesPartialUpdate();
  const availableDialCodes = useMemo(() => {
    const dialCodes = Object.keys(countriesData)
      .map((countryCode) => {
        try {
          return `+${getCountryCallingCode(countryCode as CountryCode)}`;
        } catch {
          return null;
        }
      })
      .filter((dialCode): dialCode is string => Boolean(dialCode));

    return [...new Set(dialCodes)].sort((a, b) => b.length - a.length);
  }, [countriesData]);

  useEffect(() => {
    const profileEmail = userInfo?.email?.trim();
    const quoteEmail = savedQuote?.email?.trim();
    const quotePhone = savedQuote?.phone?.trim();
    const preferredEmail = quoteEmail || profileEmail;

    if (!preferredEmail && !quotePhone) {
      return;
    }

    setAdditionalDetails((prev) => {
      let hasChanges = false;
      const next = { ...prev };

      if (preferredEmail && !prev.email) {
        next.email = preferredEmail;
        hasChanges = true;
      }

      if (quotePhone && !prev.mobile_number) {
        const parsedPhone = parsePhoneForForm(quotePhone, availableDialCodes);

        if (parsedPhone.mobile_number) {
          next.mobile_number = parsedPhone.mobile_number;
          hasChanges = true;
        }

        if (parsedPhone.dial_code) {
          next.dial_code = parsedPhone.dial_code;
          hasChanges = true;
        }
      }

      return hasChanges ? next : prev;
    });
  }, [availableDialCodes, savedQuote, setAdditionalDetails, userInfo]);

  const additionalDetailsSchema = useMemo(
    () =>
      z.object({
        transport_number: z
          .string()
          .regex(
            FLIGHT_NUMBER_REGEX,
            t("Flight number should have 2-letters and 1-4 digits"),
          ),
        email: z.string().email(t("Please check if Email is correct")),
        mobile_number: z.string().min(1, t("Please enter mobile number")),
      }),
    [t],
  );

  const validateForm = (): boolean => {
    try {
      additionalDetailsSchema.parse({
        transport_number: additionalDetails.transport_number,
        email: additionalDetails.email,
        mobile_number: additionalDetails.mobile_number,
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

    const updateData: PatchedQuoteUpdateRequest = {
      transport_number: additionalDetails.transport_number,
      email: additionalDetails.email,
      phone: `${additionalDetails.dial_code}${additionalDetails.mobile_number}`,
    };

    updateQuote(
      {
        id: quoteId!,
        data: updateData,
      },
      {
        onSuccess: (quote) => {
          const isSingle = quote.passenger_count === 1;

          setQuote(quote);
          setTravelersDetails((prev) => ({
            passengers: updateFirstPassengerFromQuote(
              prev.passengers,
              quote.passengers,
            ),
          }));
          router.push({
            pathname: isSingle ? "/checkout" : "/travelers",
            query: router.query,
          });
        },
        onError: (error) => {
          if (isValidationError(error)) {
            const validationErrors = getValidationErrors(error);
            if (Object.keys(validationErrors).length > 0) {
              const fieldMapping: Record<string, string> = {
                phone: "mobile_number",
              };
              const mappedErrors: Record<string, string> = {};
              Object.entries(validationErrors).forEach(([field, message]) => {
                const localField = fieldMapping[field] ?? field;
                mappedErrors[localField] = message;
              });
              setErrors(mappedErrors);
              return;
            }
          }
          Toast.error(getApiErrorMessage(error, t("Failed to update quote")));
        },
      },
    );
  };

  return (
    <Layout
      navBar={{}}
      footer={{
        primaryButton: {
          text: t("Continue"),
          onClick: handleContinue,
          disabled: isPending,
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
        {/* Flight Number (transport_number in API) */}
        <Title1 weight="bold" className="text-text-5 flex-1">
          {t("Additional details")}
        </Title1>
        <div className="flex flex-col gap-[8px]">
          <Footnote1>{t("Flight number")}</Footnote1>
          <Input
            value={additionalDetails.transport_number}
            placeholder={t("Enter flight number")}
            hasError={!!errors.transport_number}
            onChange={(_, value) => {
              setErrors((prev) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { transport_number, ...rest } = prev;
                return rest;
              });
              setAdditionalDetails((prev) => ({
                ...prev,
                transport_number: value.toUpperCase(),
              }));
            }}
          />
          {errors.transport_number && (
            <Footnote1 className="text-danger-6">
              {errors.transport_number}
            </Footnote1>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[8px]">
          <Footnote1>{t("Email")}</Footnote1>
          <Input
            type="email"
            value={additionalDetails.email}
            placeholder={t("Enter Email")}
            hasError={!!errors.email}
            onChange={(_, value) => {
              setErrors((prev) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { email, ...rest } = prev;
                return rest;
              });
              setAdditionalDetails((prev) => ({
                ...prev,
                email: value,
              }));
            }}
          />
          {errors.email && (
            <Footnote1 className="text-danger-6">{errors.email}</Footnote1>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex gap-[16px]">
          {/* Country Code */}
          {isDesktop ? (
            <ArcoDialCodeSelect
              label={t("Country code")}
              value={additionalDetails.dial_code}
              onChange={(dial_code) => {
                setAdditionalDetails((prev) => ({ ...prev, dial_code }));
              }}
              countriesData={countriesData}
              onClearError={() => {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.mobile_number;
                  return next;
                });
              }}
            />
          ) : (
            <div className="flex flex-col gap-[8px] w-[100px]">
              <Footnote1>{t("Country code")}</Footnote1>
              <Input
                readOnly
                value={additionalDetails.dial_code}
                suffix={<DownIcon />}
                onClick={() => {
                  addHapticFeedback("light");
                  setDialCodeVisible(true);
                }}
              />
            </div>
          )}

          {/* Mobile Number */}
          <div className="flex flex-col gap-[8px] flex-1">
            <Footnote1>{t("Mobile number")}</Footnote1>
            <Input
              value={additionalDetails.mobile_number}
              placeholder={t("Enter mobile number")}
              hasError={!!errors.mobile_number}
              onChange={(_, value) => {
                setErrors((prev) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { mobile_number, ...rest } = prev;
                  return rest;
                });
                setAdditionalDetails((prev) => ({
                  ...prev,
                  mobile_number: value,
                }));
              }}
              type="tel"
            />
            {errors.mobile_number && (
              <Footnote1 className="text-danger-6">
                {errors.mobile_number}
              </Footnote1>
            )}
          </div>
        </div>
      </div>

      {!isDesktop && (
        <DialCodeSelector
          visible={dialCodeVisible}
          onClose={() => setDialCodeVisible(false)}
          onSelect={(item) => {
            addHapticFeedback("light");
            setAdditionalDetails((prev) => ({
              ...prev,
              dial_code: `+${item.callingCode}`,
            }));
          }}
          countriesData={countriesData}
        />
      )}
    </Layout>
  );
};

export const getStaticProps = (async ({ locale = "en" }) => {
  const countries = await countriesList(undefined, {
    headers: withLanguageHeader(locale),
  });
  const countriesData: Record<string, CountryData> = {};

  for (const country of countries) {
    countriesData[country.code] = {
      name: country.title,
      flag: country.image,
    };
  }

  return {
    props: {
      countriesData,
      ...(await serverSideTranslations(locale)),
    },
    revalidate: HELP_REVALIDATE,
  };
}) satisfies GetStaticProps<{
  countriesData: Record<string, CountryData>;
}>;

export default AdditionalDetailsPage;
