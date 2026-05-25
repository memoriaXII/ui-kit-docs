import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";
import Router, { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Flex, Title1, Title3, Body1, Placeholder } from "@appboxo/ui-kit";
import { useTrackContext } from "@/mocks/kit-extras";
import { usePassesList } from "@boxo/api/lounge";
import type { EPass } from "@boxo/api/lounge";
import { Layout } from "@/components/layout/layout";
import { LoungeSkeleton } from "@/components/skeleton/lounge-skeleton";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { useFreeEntries } from "@/hooks/use-free-entries";
import { useAnimationVariants } from "@/hooks/use-animation-variants";
import { useOnboardingDrawer } from "@/hooks/use-onboarding-drawer";
import { PassesList } from "@/components/pass-card/pass-card";
import { FreePassBanner } from "@/components/free-pass-banner/free-pass-banner";
import { OnboardingDrawer } from "@/components/onboarding-drawer/onboarding-drawer";
import { exit, hasIntroductionScreenDisplayedFlag } from "@boxo/esim-util";
import BoldCloseIcon from "@/assets/icons/bold-close.svg";
import SupportIcon from "@/assets/icons/support.svg";
import FreedomStubIcon from "@/assets/icons/freedom-stub.svg";

/**
 * Sorts passes by:
 * 1. Nearest travel date and time (earliest first)
 * 2. Airport name alphabetically (A-Z)
 */
const sortPasses = (passes: EPass[]): EPass[] => {
  return [...passes].sort((a, b) => {
    const dateTimeA = `${a.quote.booking_date}T${a.quote.booking_time}`;
    const dateTimeB = `${b.quote.booking_date}T${b.quote.booking_time}`;
    const dateComparison = dateTimeA.localeCompare(dateTimeB);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    const airportNameA = a.quote.resource.hub.title.toLowerCase();
    const airportNameB = b.quote.resource.hub.title.toLowerCase();
    return airportNameA.localeCompare(airportNameB);
  });
};

export default function PassesPage() {
  const { t } = useTranslation();
  const { track } = useTrackContext();
  const router = useRouter();

  const {
    data: passes,
    isLoading: isLoadingPasses,
    isError: isPassesError,
    refetch: refetchPasses,
  } = usePassesList();

  const { hasFreeEntries, isLoading: isLoadingFreeEntries } = useFreeEntries();

  const isLoading = isLoadingPasses || isLoadingFreeEntries;
  const isError = isPassesError;

  const { containerRef, containerVariants, itemVariants } =
    useAnimationVariants({
      staggerChildren: 0.12,
      delayChildren: 0.08,
    });

  const {
    visible: onboardingVisible,
    show: showOnboarding,
    hide: hideOnboarding,
  } = useOnboardingDrawer();

  // Show onboarding drawer for first-time users.
  // Uses the same localStorage flag (`is_introduction_screen_displayed`)
  // as the `/introduction` page, so the drawer only appears on the very
  // first launch of the app.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!router.isReady) return;

    const introductionFlag = hasIntroductionScreenDisplayedFlag();
    const isFirstLaunch =
      introductionFlag === null ||
      introductionFlag === undefined ||
      introductionFlag !== "true";

    if (isFirstLaunch) {
      const timer = setTimeout(() => {
        showOnboarding();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [router.isReady, showOnboarding]);

  const handleRedeemNow = () => {
    track("home.lounge_pass.click", { action: "redeem_benefits" });
    Router.push("/airports/search");
  };

  const handleGetPassClick = () => {
    track("home.get_pass.click");
  };

  const handlePassClick = (pass: EPass) => {
    track("pass.opened", {
      pass_id: pass.id,
      airport_id: pass.quote.resource.hub.id,
      lounge_id: pass.quote.resource.id,
    });
    Router.push({ pathname: "/passes/detail", query: { pass_id: pass.id } });
  };

  const activePasses = useMemo(() => {
    return sortPasses(passes ?? []);
  }, [passes]);
  const hasActivePasses = activePasses.length > 0;
  const showEmptyState = !hasFreeEntries && !hasActivePasses;

  return (
    <Layout
      navBar={{
        enableAnimation: false,
        leftContent: (
          <Title1 weight="bold" className="text-text-5">
            {t("Fast Track")}
          </Title1>
        ),
        rightContent: <BoldCloseIcon />,
        onClickLeft: () => {},
        onClickRight: exit,
      }}
      screenState={{
        isLoading,
        isError,
        refetch: refetchPasses,
      }}
      loadingNode={
        <LoungeSkeleton
          className="px-[16px]"
          variant="separated"
          title={t("Active passes")}
        />
      }
      footer={{
        primaryButton: {
          text: t("Get Fast Track pass"),
          href: "/airports/search",
          onClick: handleGetPassClick,
        },
        secondaryButton: {
          text: t("Help Center"),
          href: "/help",
          icon: <SupportIcon />,
          className: "[&_.arco-button-text-has-icon]:!ml-[12px]",
        },
      }}
      noPaddingX
    >
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Flex gap={20} className="px-[16px]">
          {hasFreeEntries && (
            <motion.div variants={itemVariants}>
              <FreePassBanner onRedeemClick={handleRedeemNow} />
            </motion.div>
          )}

          {hasActivePasses && (
            <motion.div variants={itemVariants}>
              <Flex gap={16}>
                <Title3 weight="semibold" className="text-text-5">
                  {t("Active passes")}
                </Title3>
                <PassesList
                  passes={activePasses}
                  onPassClick={handlePassClick}
                />
              </Flex>
            </motion.div>
          )}

          {showEmptyState && (
            <motion.div variants={itemVariants}>
              <Placeholder
                className="pt-0"
                icon={
                  <div
                    className="relative w-[343px] max-w-full h-[280px] rounded-[28px] overflow-hidden flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(219deg, #9DA4BD 1.48%, #CAE4D5 100%)",
                    }}
                  >
                    <FreedomStubIcon width={243} height={229} />
                  </div>
                }
                title={
                  <Title1
                    weight="bold"
                    className="text-text-5 mb-[12px] mt-[16px]"
                  >
                    {t("No active Fast Track passes")}
                  </Title1>
                }
                subtitle={
                  <Body1 className="text-text-4">
                    {t(
                      "Purchase access to move through airport security faster.",
                    )}
                  </Body1>
                }
              />
            </motion.div>
          )}
        </Flex>
      </motion.div>

      <OnboardingDrawer visible={onboardingVisible} onClose={hideOnboarding} />
    </Layout>
  );
}

export const getStaticProps = getServerSideTranslations;
