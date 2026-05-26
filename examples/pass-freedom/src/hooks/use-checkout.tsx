import {
  FulfillmentStatusEnum,
  Order,
  PaymentStatusEnum,
  useOrdersRetrieve,
} from "@boxo/api/lounge";
import { useTrackContext } from "@/mocks/kit-extras";
import { LayoutLoading, Masking } from "@appboxo/ui-kit";
import { pay } from "@boxo/esim-util";
import { AxiosError } from "axios";
import Router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Sentry from "@sentry/nextjs";

export class CreateOrderError extends Error {
  public statusCode: number;
  public data?: unknown;
  constructor(message: string, statusCode: number, data: unknown) {
    super(message);
    this.name = "CreateOrderError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

interface VerifiedScreenProps {
  orderId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  successfulRoute?: string;
  setError: (str: string) => void;
  onComplete?: () => void | Promise<void>;
  routerQuery?: Record<string, string | string[] | undefined>;
  checkCountRef: React.MutableRefObject<number>;
}

const VerifiedScreen = ({
  orderId,
  visible,
  setVisible,
  successfulRoute,
  setError,
  onComplete,
  routerQuery,
  checkCountRef,
}: VerifiedScreenProps) => {
  const { track } = useTrackContext();
  const { t } = useTranslation();

  const { data: order, isRefetching } = useOrdersRetrieve(orderId, {
    query: {
      enabled: orderId !== "" && visible,
      refetchInterval: 3000,
    },
  });

  // Check for timeout or fulfillment failure
  useEffect(() => {
    if (!isRefetching) {
      checkCountRef.current += 1;
      if (
        checkCountRef.current > 20 ||
        order?.fulfillment_status === FulfillmentStatusEnum.FAILED
      ) {
        track("order_failed");
        setVisible(false);
        setError(t("Order processing failed. Please try again"));
      }
    }
  }, [
    order?.fulfillment_status,
    isRefetching,
    track,
    setVisible,
    setError,
    t,
    checkCountRef,
  ]);

  // Check for payment and fulfillment status
  useEffect(() => {
    if (!visible || !order) {
      return;
    }

    // Handle payment failure
    if (order.payment_status === PaymentStatusEnum.FAILED) {
      setVisible(false);
      track("payment.failed");
      setError(t("Payment Failed. Please try again"));
      return;
    }

    // Handle successful completion
    if (
      order.payment_status === PaymentStatusEnum.PAID &&
      order.fulfillment_status === FulfillmentStatusEnum.COMPLETED
    ) {
      track("payment.succeeded", {
        order_id: order.id,
        epass_id: order.epass_id,
        amount: parseFloat(order.total || "0"),
        quantity: order.quantity,
      });

      const navigateAfterComplete = async () => {
        if (onComplete) {
          await onComplete();
        }
        if (successfulRoute) {
          Router.push({
            pathname: successfulRoute,
            query: {
              ...routerQuery,
              order: order.id,
              epass_id: order.epass_id || undefined,
            },
          });
        }
      };
      navigateAfterComplete();
    }
  }, [
    onComplete,
    order,
    routerQuery,
    setError,
    setVisible,
    successfulRoute,
    t,
    track,
    visible,
  ]);

  return (
    <Masking visible={visible} close={() => {}}>
      <LayoutLoading />
    </Masking>
  );
};

export interface UseCheckoutProps {
  fn: () => Promise<Order>;
  successfulRoute?: string;
  /**
   * Whether to skip calling pay() for zero amount orders (free plans)
   * @default true
   */
  skipFreePayment?: boolean;
}

export const useCheckout = ({
  fn,
  successfulRoute,
  skipFreePayment = true,
}: UseCheckoutProps) => {
  const router = useRouter();
  const { track } = useTrackContext();
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const errorCallbackRef = useRef<(str: string) => void>();
  const completeCallbackRef = useRef<() => void | Promise<void>>();
  const checkCountRef = useRef(0);

  const checkout = useCallback(async () => {
    setLoading(true);

    try {
      Sentry.addBreadcrumb({
        category: "checkout",
        message: "Start checkout",
        level: "info",
      });
      let order: Order;

      try {
        order = await fn();
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new CreateOrderError(
            error.response?.data?.message || "Order creation failed",
            error.status!,
            error.response?.data,
          );
        }
        throw error;
      }

      Sentry.addBreadcrumb({
        category: "checkout",
        message: "Created order",
        level: "info",
        data: { ...order },
      });

      const { id, total, total_currency, external_id } = order;
      const numberPrice = parseFloat(total);

      let payResponse = { status: "success" };

      // Skip payment for free orders (if skipFreePayment is true)
      if (numberPrice !== 0 || !skipFreePayment) {
        payResponse = await pay({
          amount: numberPrice,
          miniappOrderId: id,
          currency: total_currency || "AED",
          transactionToken: external_id || "",
        });
      }

      Sentry.addBreadcrumb({
        category: "checkout",
        message: "Order Paid",
        level: "info",
        data: payResponse,
      });

      if (["pending", "success"].includes(payResponse.status)) {
        setOrderId(id);
        return true;
      }

      if (payResponse.status === "failed") {
        track("payment.failed");
        throw new Error("Payment failed");
      }
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    } finally {
      setLoading(false);
    }
    return false;
  }, [fn, track, skipFreePayment]);

  useEffect(() => {
    if (error && errorCallbackRef.current) {
      errorCallbackRef.current(error);
    }
  }, [error]);

  const verifyCheckoutDom = useMemo(() => {
    return (
      <VerifiedScreen
        visible={visible}
        setVisible={setVisible}
        orderId={orderId}
        successfulRoute={successfulRoute}
        setError={setError}
        onComplete={completeCallbackRef.current}
        routerQuery={
          router.query as Record<string, string | string[] | undefined>
        }
        checkCountRef={checkCountRef}
      />
    );
  }, [orderId, router.query, successfulRoute, visible]);

  const wait = async ({
    onError,
    onComplete,
  }: {
    onError?: (str: string) => void;
    onComplete?: () => void | Promise<void>;
  }) => {
    errorCallbackRef.current = onError;
    completeCallbackRef.current = onComplete;
    checkCountRef.current = 0;
    setError("");
    setVisible(true);
  };

  return {
    checkout,
    wait,
    isLoading,
    verifyCheckoutDom,
  };
};
