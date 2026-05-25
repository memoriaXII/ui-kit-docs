/**
 * Demo-only stub for the auth surface that used to live in @boxo/esim-ui.
 *
 * The real WithAuth wrapped the tree with the Boxo login handshake and a
 * React context that downstream pages read. For the demo we just provide a
 * passthrough Provider with an always-authenticated user, so flows render.
 */

import { createContext, PropsWithChildren, useContext } from "react";

export interface AuthContextProps<User = unknown> {
  isLoggedIn: boolean;
  loginLoading: boolean;
  loginError: unknown;
  userInfo:
    | (User & {
        id: string | number;
      })
    | undefined;
  userInfoRefetch?: () => void;
  userInfoRefetching?: boolean;
}

const defaultValue: AuthContextProps = {
  isLoggedIn: true,
  loginLoading: false,
  loginError: null,
  userInfo: {
    id: 1,
    first_name: "Demo",
    last_name: "User",
    email: "demo@freedom.example",
  } as AuthContextProps["userInfo"],
};

const Ctx = createContext<AuthContextProps>(defaultValue);

export const WithAuth = ({
  children,
  auth,
}: PropsWithChildren<{ auth: AuthContextProps }>) => (
  <Ctx.Provider value={auth}>{children}</Ctx.Provider>
);

export const useAuthContext = <User = unknown,>(): AuthContextProps<User> =>
  useContext(Ctx) as AuthContextProps<User>;
