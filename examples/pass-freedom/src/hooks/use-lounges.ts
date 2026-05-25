import {
  getHubsResourcesListQueryKey,
  TerminalLounges,
  useResourcesRetrieve,
  type Lounge,
} from "@boxo/api/lounge";
import type { LoungeDetail } from "@/lib/lounges";
import { useQueryClient } from "@tanstack/react-query";

// Map API lounge to full detail view model used by the detail page
const transformLoungeToDetail = (lounge: Lounge): LoungeDetail => {
  return {
    ...lounge,
    imageUrl: lounge.images?.[0]?.url || "",
    airport: lounge.hub.title,
    airportCode: lounge.hub.iata,
    destination: [lounge.terminal, lounge.nearest_gate]
      .filter(Boolean)
      .join(" · "),
    amenities: Array.from(lounge.amenities || []),
  };
};

export const useFullLoungeDetail = (hubId: string, loungeId: string) => {
  const queryClient = useQueryClient();

  const { data, ...query } = useResourcesRetrieve(loungeId, {
    query: {
      placeholderData() {
        const terminals: TerminalLounges[] | undefined =
          queryClient.getQueryData(getHubsResourcesListQueryKey(hubId));
        const lounges = terminals?.reduce((acc: Lounge[], terminal) => {
          return [...acc, ...terminal.lounges];
        }, []);
        const lounge = lounges?.find((item) => item.id === loungeId);
        return lounge;
      },
    },
  });

  return {
    ...query,
    data: data ? transformLoungeToDetail(data) : null,
  };
};
