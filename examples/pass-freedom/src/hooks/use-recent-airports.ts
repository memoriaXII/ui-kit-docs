import { useLocalStorageState } from "ahooks";

export const useRecentAirports = () => {
  return useLocalStorageState("recent-airports", {
    defaultValue: [] as string[],
  });
};
