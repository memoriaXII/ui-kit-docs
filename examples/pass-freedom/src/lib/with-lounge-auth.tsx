import { useAccountsMeRetrieve, type User } from "@boxo/api/lounge";
import { PropsWithChildren, useMemo } from "react";
import {
  AuthContextProps,
  useAuthContext,
  WithAuth,
} from "@/mocks/with-auth";
import { useAuthEffect } from "@/mocks/use-auth-effect";
import { useDesktopBoxoLogin } from "./use-desktop-boxo-login";

/**
 * Lounge-specific auth component that uses /api/v1/accounts/me/ instead of /api/v2/accounts/me/
 * This is needed because pass-freedom uses v1 API while esim miniapps use v2 API
 *
 * Uses useDesktopBoxoLogin (with promise caching) instead of useBoxoLogin
 * to prevent duplicate authorize calls in desktop iframe environments.
 */
export const WithLoungeAuth = ({ children }: PropsWithChildren) => {
  const {
    isLoggedIn,
    isLoading: loginLoading,
    error: loginError,
  } = useDesktopBoxoLogin();

  const {
    data: userInfo,
    refetch: userInfoRefetch,
    isRefetching: userInfoRefetching,
  } = useAccountsMeRetrieve({
    query: { enabled: isLoggedIn, refetchOnWindowFocus: false },
  });

  const values = useMemo(
    () => ({
      isLoggedIn,
      loginLoading,
      loginError,
      // Use username as id since User type doesn't have id field
      userInfo: userInfo
        ? ({ ...userInfo, id: userInfo.username } as User & { id: string })
        : undefined,
      userInfoRefetch,
      userInfoRefetching,
    }),
    [
      isLoggedIn,
      loginError,
      loginLoading,
      userInfo,
      userInfoRefetch,
      userInfoRefetching,
    ],
  );

  useAuthEffect(values as AuthContextProps);

  return <WithAuth auth={values as AuthContextProps}>{children}</WithAuth>;
};

export const useLoungeAuthContext = () => {
  return useAuthContext() as AuthContextProps<User>;
};
