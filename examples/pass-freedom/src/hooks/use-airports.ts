import { HubsListResourceType, useHubsList, type Hub } from "@boxo/api/lounge";

export const useNearbyAirports = (latitude?: string, longitude?: string) => {
  const hasPoint = !!latitude && !!longitude;
  const { data, ...query } = useHubsList(
    {
      point: hasPoint ? `${longitude},${latitude}` : undefined,
      resource_type: HubsListResourceType.FAST_TRACK,
    },
    {
      query: {
        enabled: hasPoint,
        staleTime: 30 * 60 * 1000, // 30 minutes - nearby airports don't change frequently
        gcTime: 60 * 60 * 1000, // 60 minutes - keep in cache for longer
      },
    },
  );

  return {
    ...query,
    data: data?.results as Hub[] | undefined,
  };
};
