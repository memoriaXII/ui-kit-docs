import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Flex, Title2, Body1, Placeholder, useDesktopDetection } from "@appboxo/ui-kit";
import { useLocation as useLocationFromEsimUI } from "@/mocks/kit-extras";
import { useTrackContext } from "@/mocks/kit-extras";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import {
  HubsListResourceType,
  hubsRetrieve,
  useHubsList,
} from "@boxo/api/lounge";
import NoConnectionIcon from "@/assets/icons/no-connection.svg";
import { useState, useEffect } from "react";
import { AirportsList } from "@/components/lounge/airports-list";
import { LoungeSkeleton } from "@/components/skeleton/lounge-skeleton";
import { EnableLocationPrompt } from "@/components/lounge/enable-location-prompt";
import { useNearbyAirports } from "@/hooks/use-airports";
import { useDebounce } from "ahooks";
import { useRecentAirports } from "@/hooks/use-recent-airports";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomSearchBar } from "@/components/search-bar";
import Router from "next/router";
import Image from "next/image";
import HomeAndSearchLogo from "@/../public/images/home-and-search.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import { useLocation as useLocationDesktop } from "@/hooks/use-location";
import appboxoSDK from "@appboxo/js-sdk";

const MAX_NEARBY_AIRPORTS = 3;

const Page = () => {
  const { t } = useTranslation();
  const { track } = useTrackContext();
  const queryClient = useQueryClient();
  const isDesktop = useDesktopDetection();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, { wait: 300 });
  const [recentAirports = []] = useRecentAirports();
  const { data: recentAirportsData = [] } = useQuery({
    queryKey: ["recent-airports", recentAirports],
    queryFn: () =>
      Promise.all(recentAirports.map((airport) => hubsRetrieve(airport))),
  });

  // Use different location hooks based on desktop/mobile
  // Mobile: use esim-ui's useLocation (original behavior)
  // Desktop: use custom hook with browser geolocation API support
  // Note: Both hooks use the same queryKey ["location"], so cache updates will sync
  const locationHookMobile = useLocationFromEsimUI({
    geodataParams: {
      logo: "https://res.cloudinary.com/ds4pux6du/image/upload/v1772194158/geolocation_ozngx5.png",
      title: t("Enable location services"),
      description: t("We will suggest available airports nearby"),
      allow_button: t("Allow location services"),
      skip_button: t("Skip"),
    },
  });
  const locationHookDesktop = useLocationDesktop();
  const locationHook = isDesktop ? locationHookDesktop : locationHookMobile;

  const { data: location, refetch: refetchLocation } = locationHook;

  // Show location prompt if location is disabled
  // Mobile: original behavior - show when location is not available
  // Desktop: show when location data is available (not undefined) and disabled
  // After user enables location, this will become false and banner will disappear
  const isLocationDisabled = isDesktop
    ? location !== undefined &&
      (!location?.available || (!location?.lat && !location?.long))
    : !location?.available || (!location?.lat && !location?.long);

  const { data: nearbyAirports, isLoading: isLoadingNearbyAirports } =
    useNearbyAirports(location?.lat, location?.long);
  const { data, isLoading: isSearching } = useHubsList({
    search: debouncedSearch,
    limit: 9999,
    resource_type: HubsListResourceType.FAST_TRACK,
  });

  const searchResults = data?.results;
  const isLoading = isSearching || isLoadingNearbyAirports;
  const showNoResults = !isLoading && !searchResults?.length;

  useEffect(() => {
    if (debouncedSearch) {
      track("home.search.submit", { search_query: debouncedSearch });
    }
  }, [debouncedSearch, track]);

  const handleAirportSelect = (airportId: string) => {
    track("home.search.airport.select", { airport_id: airportId });
  };

  const handleNearbyAirportSelect = (airportId: string) => {
    track("home.nearby_airport.select", { airport_id: airportId });
  };

  const handleEnableLocation = async () => {
    track("home.enable_location.click");
    console.log(
      "[Location] handleEnableLocation called, isDesktop:",
      isDesktop,
    );

    // Desktop: use custom logic with browser geolocation API support
    if (isDesktop) {
      console.log("[Location] Desktop mode - using browser geolocation API");

      // Try AppBoxo SDK first (works for both mobile and desktop iframe with web-sdk)
      try {
        if (
          appboxoSDK.supports &&
          appboxoSDK.supports("AppBoxoWebAppGetGeodata")
        ) {
          console.log(
            "[Location] SDK supports GetGeodata, requesting location...",
          );
          const locationData = await appboxoSDK.sendPromise(
            "AppBoxoWebAppGetGeodata",
          );
          console.log("[Location] SDK GetGeodata response:", locationData);

          if (
            locationData?.available &&
            locationData?.lat &&
            locationData?.long
          ) {
            const location = {
              available: true,
              lat: locationData.lat,
              long: locationData.long,
            };
            // Update query cache directly with the new location data
            queryClient.setQueryData(["location"], location);
            // Invalidate to trigger refetch
            await queryClient.invalidateQueries({ queryKey: ["location"] });
            return;
          }
        } else {
          console.log(
            "[Location] SDK does not support GetGeodata, trying direct browser API",
          );
        }
      } catch (error: unknown) {
        console.error("[Location] Error in js-sdk GetGeodata:", error);
        const errorObj = error as { message?: string; code?: number };
        console.log(
          "[Location] SDK GetGeodata failed, trying direct browser API:",
          errorObj,
        );
      }

      // Fallback: Try direct browser API (for non-iframe environments)
      if (typeof window !== "undefined" && navigator.geolocation) {
        console.log("[Location] Trying direct browser API...");
        try {
          const locationData = await new Promise<{
            lat: string;
            long: string;
          } | null>((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("[Location] Browser API success:", position.coords);
                resolve({
                  lat: position.coords.latitude.toString(),
                  long: position.coords.longitude.toString(),
                });
              },
              (error) => {
                console.log("[Location] Browser API error:", error);
                // Check if it's a permissions policy violation
                if (
                  error.code === 1 &&
                  error.message?.includes("permissions policy")
                ) {
                  console.warn(
                    "[Location] Geolocation blocked by Permissions Policy. " +
                      "Parent window needs to allow geolocation for iframe.",
                  );
                }
                resolve(null);
              },
              {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000,
              },
            );
          });

          if (locationData) {
            const location = {
              available: true,
              lat: locationData.lat,
              long: locationData.long,
            };
            // Update query cache directly with the new location data
            queryClient.setQueryData(["location"], location);
            // Invalidate to trigger refetch
            await queryClient.invalidateQueries({ queryKey: ["location"] });
          } else {
            console.log("[Location] Browser API returned null, trying refetch");
            await refetchLocation();
          }
        } catch (error) {
          console.error("[Location] Browser API error:", error);
          await refetchLocation();
        }
      } else {
        console.log(
          "[Location] Browser geolocation not available, trying refetch",
        );
        // Fallback: try refetch if browser API not available
        await refetchLocation();
      }
    } else {
      // Mobile: use original behavior - just refetch
      console.log("[Location] Mobile mode - using refetchLocation");
      await refetchLocation();
    }
  };

  const handleBack = () => {
    Router.replace("/passes");
  };

  // Handle clear button click in desktop mode
  // Arco Design SearchBar's onClear may not work properly in desktop mode
  useEffect(() => {
    if (!isDesktop) return;

    const handleClearClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClearButton =
        target.closest(".arco-search-bar-clear") ||
        target.classList.contains("arco-search-bar-clear") ||
        target.closest(".arco-icon-clear") ||
        target.closest('[class*="clear"]');

      if (isClearButton) {
        e.preventDefault();
        e.stopPropagation();
        setSearch("");
      }
    };

    // Use capture phase to catch the event early
    document.addEventListener("click", handleClearClick, true);

    return () => {
      document.removeEventListener("click", handleClearClick, true);
    };
  }, [isDesktop]);

  const searchBar = (
    <CustomSearchBar
      className="mt-[8px] mb-[24px]"
      placeholder={t("Search by country, city or airport")}
      value={search}
      onChange={(_, value) => setSearch(value)}
      autoFocus
      onClear={() => setSearch("")}
    />
  );

  return (
    <Layout
      navBar={{
        title: t("Choose airport"),
        enableAnimation: false,
        onClickLeft: handleBack,
        onClickRight: handleBack,
      }}
      customHeader={null}
      stickyHeaderContent={isDesktop ? searchBar : undefined}
      noPaddingY
      logo={
        <Image
          src={HomeAndSearchLogo}
          alt=""
          width={DESKTOP_CONSTANTS.LOGO_WIDTH}
          height={DESKTOP_CONSTANTS.LOGO_HEIGHT}
        />
      }
    >
      {!isDesktop && searchBar}

      <Flex className="pb-[100px]" gap={24}>
        {isLoading ? (
          <LoungeSkeleton />
        ) : showNoResults ? (
          <Placeholder
            className="pt-[24px]"
            icon={<NoConnectionIcon style={{ width: 84, height: 84 }} />}
            title={
              <Title2 weight="bold" className="text-text-5 mb-[4px]">
                {t("No results found")}
              </Title2>
            }
            subtitle={
              <Body1 className="text-text-4 w-[280px]">
                {t(
                  "This airport isn't supported yet. Try selecting a different airport.",
                )}
              </Body1>
            }
          />
        ) : debouncedSearch ? (
          <AirportsList
            airports={searchResults}
            onAirportSelect={handleAirportSelect}
          />
        ) : (
          <>
            <AirportsList
              title={t("Recently viewed")}
              airports={recentAirportsData}
              onAirportSelect={handleAirportSelect}
            />

            {isLocationDisabled ? (
              <AirportsList
                title={t("All airports")}
                airports={searchResults}
                onAirportSelect={handleAirportSelect}
                headerContent={
                  <EnableLocationPrompt
                    refetchLocation={handleEnableLocation}
                  />
                }
              />
            ) : (
              <>
                <AirportsList
                  title={t("Nearby airports")}
                  airports={nearbyAirports?.slice(0, MAX_NEARBY_AIRPORTS)}
                  onAirportSelect={handleNearbyAirportSelect}
                />
                <AirportsList
                  title={t("All airports")}
                  airports={searchResults}
                  onAirportSelect={handleAirportSelect}
                />
              </>
            )}
          </>
        )}
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default Page;
