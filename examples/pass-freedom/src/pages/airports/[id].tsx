import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticPaths, GetStaticProps } from "next";
import { Flex, Title1, Title2, Title3, Body1, Placeholder } from "@appboxo/ui-kit";
import { useTrackContext } from "@/mocks/kit-extras";
import { Layout } from "@/components/layout/layout";
import { FastTrackCard } from "@/components/lounge/fast-track-card";
import { CountryFlag } from "@/components/lounge/country-flag";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { AirportDetailSkeleton } from "@/components/skeleton/airport-detail-skeleton";
import {
  HubsResourcesListResourceType,
  useHubsResourcesList,
  useHubsRetrieve,
} from "@boxo/api/lounge";
import { useState } from "react";
import { useFreeEntries } from "@/hooks/use-free-entries";
import { useRecentAirports } from "@/hooks/use-recent-airports";
import { useResetNewBooking } from "@/hooks/use-reset-new-booking";
import { useMount } from "ahooks";
import Lottie from "lottie-react";
import EmptyAnimation from "@/assets/animations/empty.json";
import Image from "next/image";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";

const MAX_RECENT_AIRPORTS = 2;

const AirportDetailPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { track } = useTrackContext();
  const { id, name } = router.query as { id: string; name: string };
  const [recentAirports = [], setRecentAirports] = useRecentAirports();
  const [selectedLoungeId, setSelectedLoungeId] = useState<string | null>(null);
  const { hasFreeEntries } = useFreeEntries();
  const resetNewBooking = useResetNewBooking();

  const { data: hub } = useHubsRetrieve(id);

  const {
    data: apiLoungesByTerminal = [],
    isLoading,
    isError,
  } = useHubsResourcesList(id, {
    resource_type: HubsResourcesListResourceType.FAST_TRACK,
  });

  const airportTitle = hub?.title || name || "";
  const countryImage = hub?.country?.image || "";

  const handleLoungeSelect = (loungeId: string) => {
    setSelectedLoungeId(loungeId);
    track("airport.lounge.select", {
      airport_id: id,
      lounge_id: loungeId,
    });
  };

  const handleContinue = () => {
    track("airport.get_pass.click", {
      airport_id: id,
      lounge_id: selectedLoungeId,
    });
    resetNewBooking();
    router.push({
      pathname: "/booking-details",
      query: {
        airport_id: id,
        lounge_id: selectedLoungeId,
      },
    });
  };

  const hasLounges = apiLoungesByTerminal.some(
    (terminal) => terminal.lounges.length > 0,
  );

  useMount(() => {
    // Add to beginning so most recent appears first, keep only MAX_RECENT_AIRPORTS
    const filtered = recentAirports.filter((airportId) => airportId !== id);
    const updated = [id, ...filtered].slice(0, MAX_RECENT_AIRPORTS);
    setRecentAirports(updated);
  });

  return (
    <Layout
      navBar={{}}
      customHeader={
        <div className="mb-[20px] flex flex-row items-center justify-between gap-[16px]">
          <Title1 weight="bold" className="text-text-5 flex-1">
            {airportTitle}
          </Title1>
          {countryImage && (
            <CountryFlag
              imageUrl={countryImage}
              size={32}
              className="flex-shrink-0"
            />
          )}
        </div>
      }
      footer={{
        primaryButton: {
          text: hasFreeEntries ? t("Get pass for free") : t("Continue"),
          onClick: () => selectedLoungeId && handleContinue(),
          disabled: !selectedLoungeId,
          className: !selectedLoungeId
            ? "opacity-70 cursor-not-allowed pointer-events-none"
            : undefined,
        },
      }}
      screenState={{
        isLoading,
        isError,
      }}
      loadingNode={<AirportDetailSkeleton />}
      logo={
        <Image
          src={OthersLogo}
          alt=""
          width={DESKTOP_CONSTANTS.LOGO_WIDTH}
          height={DESKTOP_CONSTANTS.LOGO_HEIGHT}
        />
      }
    >
      {!hasLounges ? (
        <Placeholder
          className="pt-[24px]"
          icon={
            <Lottie
              animationData={EmptyAnimation}
              style={{ width: 144, height: 144 }}
            />
          }
          title={
            <Title2 weight="bold" className="text-text-5 mb-[4px]">
              {t("No lounges available")}
            </Title2>
          }
          subtitle={
            <Body1 className="text-text-4 w-[280px]">
              {t("Please check back later")}
            </Body1>
          }
        />
      ) : (
        <Flex gap={40}>
          {apiLoungesByTerminal.map((terminal) => (
            <Flex key={terminal.terminal} gap={12}>
              <Title3 weight="semibold">{terminal.terminal}</Title3>
              <Flex gap={12}>
                {terminal.lounges.map((lounge) => (
                  <FastTrackCard
                    key={lounge.id}
                    lounge={lounge}
                    selected={selectedLoungeId === lounge.id}
                    onSelect={() => handleLoungeSelect(lounge.id)}
                  />
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default AirportDetailPage;
