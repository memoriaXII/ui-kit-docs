import { useMembershipsPromotionRetrieve } from "@boxo/api/lounge";

/**
 * Hook to check if user has available free entries from their banking benefits.
 * Uses fast_track-specific fields from the promotion API.
 */
export function useFreeEntries() {
  const { data: freeEntriesInfo, isLoading } =
    useMembershipsPromotionRetrieve();

  const fastTrack = freeEntriesInfo?.fast_track;
  const hasFreeEntries =
    fastTrack?.available === true &&
    fastTrack?.remaining_free_entries !== undefined &&
    fastTrack.remaining_free_entries > 0;
  const freePassCount = fastTrack?.remaining_free_entries || 0;

  return {
    hasFreeEntries,
    freePassCount,
    isLoading,
  };
}
