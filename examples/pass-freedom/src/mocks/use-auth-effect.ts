import type { AuthContextProps } from "./with-auth";

export const useAuthEffect = (_auth: AuthContextProps) => {
  // no-op in demo; production wires Sentry user + react-query refetch here
};
