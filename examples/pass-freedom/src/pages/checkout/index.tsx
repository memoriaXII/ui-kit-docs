import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { cls } from "@arco-design/mobile-utils";
import { Body1, Body2, Card, Title3, Toast, PrimaryButton, useDesktopDetection, Placeholder, Title2 } from "@appboxo/ui-kit";
import { useTrackContext } from "@/mocks/kit-extras";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { addHapticFeedback } from "@boxo/esim-util";
import { useRouter } from "next/router";
import {
  useOrdersPassCheckoutCreate,
  useOrdersPassCreate,
  ModuleTypeEnum,
  getMembershipsPromotionRetrieveQueryKey,
} from "@boxo/api/lounge";
import { useAtomValue, useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import {
  CASHBACK_PERCENT,
  computeCashback,
  formatDiscount,
  formatPrice,
} from "@/lib/price";
import { bookingDetailsAtom } from "@/atoms/booking";
import { quoteAtom } from "@/atoms/quote";
import { BookingInfoSection } from "@/components/booking-info-section/booking-info-section";
import { ThingsToKnow } from "@/components/things-to-know/things-to-know";
import { CreateOrderError, useCheckout } from "@/hooks/use-checkout";
import { useResetCheckoutState } from "@/hooks/use-reset-checkout-state";
import { TimeSlotUnavailablePopup } from "@/components/time-slot-unavailable-popup/time-slot-unavailable-popup";
import { isTimeSlotUnavailableError } from "@/lib/api-error";
import Image from "next/image";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import styles from "./index.module.css";

const FREEDOM_SHADOW_CLASS = "shadow-[0_5px_20px_0_rgba(0,0,0,0.05)]";

const parseAmount = (value: string | undefined | null): number => {
  if (!value) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { track } = useTrackContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isDesktop = useDesktopDetection();

  const { airport_id, lounge_id } = router.query as {
    airport_id?: string;
    lounge_id?: string;
  };

  const resetCheckoutState = useResetCheckoutState();
  const savedQuote = useAtomValue(quoteAtom);
  const quoteId = savedQuote?.id;
  const setBookingDetails = useSetAtom(bookingDetailsAtom);
  const [showTimeSlotUnavailablePopup, setShowTimeSlotUnavailablePopup] =
    useState(false);

  const hasQuoteId = !!quoteId;
  const {
    data: checkoutData,
    isPending: isCheckoutLoading,
    isError: isCheckoutError,
    refetch: refetchCheckout,
  } = useOrdersPassCheckoutCreate(
    {
      quote: quoteId ?? "",
      module_type: ModuleTypeEnum.FAST_TRACK,
      asset_type: null,
    },
    {
      query: {
        enabled: hasQuoteId,
      },
    },
  );
  const { mutateAsync: createOrder } = useOrdersPassCreate();

  const quote = checkoutData?.quote;
  const currency = checkoutData?.currency;
  const subtotal = parseAmount(checkoutData?.subtotal);
  const total = parseAmount(checkoutData?.total);
  const isFree = checkoutData != null && total === 0;
  const shouldHidePriceBlock = isFree && (quote?.passenger_count ?? 0) === 1;

  const discountAmount = checkoutData?.you_save
    ? parseAmount(checkoutData.you_save)
    : parseAmount(checkoutData?.discount);
  const hasDiscount = checkoutData != null && discountAmount > 0;

  const cashbackAmount = isFree ? 0 : computeCashback(total);

  const missingQuote = !hasQuoteId;
  const checkoutFailed = hasQuoteId && isCheckoutError && !isCheckoutLoading;

  const createOrderFn = useCallback(async () => {
    if (!quote) {
      throw new Error("Quote is not available");
    }
    const order = await createOrder({
      data: {
        quote: quote.id,
        module_type: ModuleTypeEnum.FAST_TRACK,
      },
    });
    return order;
  }, [createOrder, quote]);

  const {
    isLoading: isOrderLoading,
    checkout,
    wait,
    verifyCheckoutDom,
  } = useCheckout({
    fn: createOrderFn,
    successfulRoute: "/purchase-complete",
  });

  const isPending = isCheckoutLoading || isOrderLoading;

  const pricingSummary = useMemo(() => {
    const priceCell = (
      <div className="flex items-center gap-[8px]">
        {hasDiscount && (
          <span className="relative inline-flex items-center">
            <Body1 className="text-text-3">
              {formatPrice(subtotal, currency)}
            </Body1>
            <span className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-text-3 pointer-events-none" />
          </span>
        )}
        <Body1 className="text-text-5" weight="semibold">
          {formatPrice(total, currency)}
        </Body1>
      </div>
    );

    return (
      <Card className={cls("bg-fill-1", FREEDOM_SHADOW_CLASS)}>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center justify-between">
            <Body2 className="text-text-4">{t("Price")}</Body2>
            {priceCell}
          </div>

          {hasDiscount && (
            <div className="flex items-center justify-between">
              <Body2 className="text-text-4">{t("Premium discount")}</Body2>
              <Body1 weight="semibold" className="text-text-5">
                {formatDiscount(discountAmount, currency)}
              </Body1>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Body1 weight="semibold" className="text-text-5">
              {t("Total")}
            </Body1>
            <div className="flex items-center gap-[8px]">
              {hasDiscount && (
                <span className="relative inline-flex items-center">
                  <Body1 className="text-text-3">
                    {formatPrice(subtotal, currency)}
                  </Body1>
                  <span className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-text-3 pointer-events-none" />
                </span>
              )}
              <Title3 weight="semibold" className="text-text-5">
                {formatPrice(total, currency)}
              </Title3>
            </div>
          </div>

          {CASHBACK_PERCENT > 0 && (
            <div className="flex items-center justify-between">
              <Body2 className="text-text-5" weight="medium">
                {t("Cashback ({{percent}}%)", { percent: CASHBACK_PERCENT })}
              </Body2>
              <Body2 weight="semibold" className="text-freedom-gradient">
                {cashbackAmount > 0
                  ? `+${formatPrice(cashbackAmount, currency)}`
                  : formatPrice(0, currency)}
              </Body2>
            </div>
          )}
        </div>
      </Card>
    );
  }, [
    hasDiscount,
    discountAmount,
    subtotal,
    total,
    currency,
    cashbackAmount,
    t,
  ]);

  const termsNotice = (
    <Body2 className="text-text-4 text-center px-[8px]">
      {t('By tapping "Continue to payment", I agree to the terms of the ')}
      <span className="text-primary-6 font-semibold">{t("Public Offer")}</span>
    </Body2>
  );

  const handleContinueToPayment = async () => {
    addHapticFeedback("medium");
    if (!checkoutData || !quote) return;

    try {
      track(isFree ? "checkout.free.confirm" : "checkout.payment.confirm", {
        airport_id: airport_id || undefined,
        lounge_id: lounge_id || undefined,
        passenger_count: quote.passenger_count,
        amount: total,
      });

      if (await checkout()) {
        await wait({
          onError: (errMsg) => {
            Toast.error(errMsg);
          },
          onComplete: async () => {
            await queryClient.invalidateQueries({
              queryKey: getMembershipsPromotionRetrieveQueryKey(),
            });
            resetCheckoutState();
          },
        });
      }
    } catch (error) {
      console.error("[Checkout] Payment error:", error);
      track("payment.failed", {
        airport_id: airport_id || undefined,
        lounge_id: lounge_id || undefined,
        passenger_count: quote?.passenger_count,
        amount: total,
        error_code: error instanceof Error ? error.name : "unknown",
        error_message: error instanceof Error ? error.message : "unknown",
      });

      if (error instanceof CreateOrderError) {
        if (isTimeSlotUnavailableError(error.data)) {
          setShowTimeSlotUnavailablePopup(true);
          return;
        }
        Toast.error(
          error.message || t("Create Order Failed. Please try again"),
        );
      } else {
        Toast.error(t("Payment Failed. Please try again"));
      }
    }
  };

  const handleSelectNewTime = () => {
    setBookingDetails((prev) => ({ ...prev, booking_time: undefined }));
    router.push({
      pathname: "/booking-details",
      query: {
        ...router.query,
        time_slot_error: "1",
      },
    });
  };

  const handleGoToBookingDetails = () => {
    router.push({
      pathname: "/booking-details",
      query: {
        airport_id: airport_id ?? "",
        lounge_id: lounge_id ?? "",
      },
    });
  };

  return (
    <div className={styles.checkoutPage}>
      <Layout
        navBar={{
          title: t("Checkout"),
        }}
        footer={
          !isDesktop && !missingQuote && !checkoutFailed
            ? {
                primaryButton: {
                  text: isFree
                    ? t("Get pass for free")
                    : t("Continue to payment"),
                  onClick: handleContinueToPayment,
                  disabled: isPending || !checkoutData,
                  loading: isOrderLoading,
                },
                footerExtra: termsNotice,
              }
            : undefined
        }
        footerClassName={styles.noShadowFooter}
        logo={
          <Image
            src={OthersLogo}
            alt=""
            width={DESKTOP_CONSTANTS.LOGO_WIDTH}
            height={DESKTOP_CONSTANTS.LOGO_HEIGHT}
          />
        }
      >
        <div
          className={cls(
            "flex flex-col gap-[16px]",
            !isDesktop && "pb-[100px]",
          )}
        >
          {missingQuote ? (
            <Placeholder
              className="pt-[24px]"
              icon={null}
              title={
                <Title2 weight="bold" className="text-text-5 mb-[8px]">
                  {t("Select your time slot")}
                </Title2>
              }
              subtitle={t(
                "Your session has expired or you opened this page directly. Please select your Fast Track access window to continue.",
              )}
              button={{
                text: t("Select time slot"),
                onClick: handleGoToBookingDetails,
              }}
            />
          ) : checkoutFailed ? (
            <Placeholder
              className="pt-[24px]"
              icon={null}
              title={
                <Title2 weight="bold" className="text-text-5 mb-[8px]">
                  {t("Something went wrong")}
                </Title2>
              }
              subtitle={t(
                "We couldn't load checkout. This may be a temporary server issue. Please try again.",
              )}
              button={{
                text: t("Try again"),
                onClick: () => refetchCheckout(),
              }}
            />
          ) : (
            <>
              <Card className={cls("bg-fill-1", FREEDOM_SHADOW_CLASS)}>
                <BookingInfoSection
                  quote={quote}
                  isLoading={!quote}
                  editable
                  routerQuery={router.query}
                />
              </Card>

              <div className={styles.thingsToKnowWrapper}>
                <ThingsToKnow className={FREEDOM_SHADOW_CLASS} />
              </div>

              {!shouldHidePriceBlock && pricingSummary}

              {isDesktop && (
                <div className="flex flex-col gap-[16px]">
                  <PrimaryButton
                    text={
                      isFree ? t("Get pass for free") : t("Continue to payment")
                    }
                    onClick={handleContinueToPayment}
                    disabled={isPending || !checkoutData}
                    loading={isOrderLoading}
                  />
                  {termsNotice}
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
      {verifyCheckoutDom}
      <TimeSlotUnavailablePopup
        visible={showTimeSlotUnavailablePopup}
        onSelectNewTime={handleSelectNewTime}
        onClose={() => setShowTimeSlotUnavailablePopup(false)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default CheckoutPage;
