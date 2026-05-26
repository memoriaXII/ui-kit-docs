import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import {
  Body1,
  Body2,
  Card,
  Carousel,
  type CarouselRef,
  Skeleton,
  Title2,
} from "@appboxo/ui-kit";
import { useTrackContext } from "@/mocks/kit-extras";
import { addHapticFeedback } from "@boxo/esim-util";
import { cls } from "@arco-design/mobile-utils";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { usePassesRetrieve } from "@boxo/api/lounge";
import type { Voucher } from "@boxo/api/lounge";
import { BookingInfoSection } from "@/components/booking-info-section/booking-info-section";
import { ThingsToKnow } from "@/components/things-to-know/things-to-know";
import DragonPassLogo from "@/assets/icons/dragonpass.svg";
import DragonPassDarkLogo from "@/assets/icons/dragonpass-dark.svg";
import SliderIcon from "@/assets/icons/slider-icon.svg";
import QRCode from "react-qr-code";
import Image from "next/image";
import OthersLogo from "@/../public/images/others.png";
import { DESKTOP_CONSTANTS } from "@/lib/desktop-constants";
import styles from "./detail.module.css";

const FREEDOM_SHADOW_CLASS = "shadow-[0_5px_20px_0_rgba(0,0,0,0.05)]";

interface QRCardProps {
  voucher?: Voucher;
  isLoading?: boolean;
}

const QRCard = ({ voucher, isLoading }: QRCardProps) => {
  const fullName = voucher ? `${voucher.first_name} ${voucher.last_name}` : "";

  return (
    <div
      className={cls(
        "flex flex-col items-center gap-[20px] bg-fill-1 rounded-[20px] pt-[40px] pb-[20px] px-[20px]",
        FREEDOM_SHADOW_CLASS,
      )}
    >
      <DragonPassLogo
        className={styles.dragonPassLogoLight}
        width={161}
        height={24}
      />
      <DragonPassDarkLogo
        className={styles.dragonPassLogoDark}
        width={161}
        height={24}
      />

      {/* QR Code */}
      {isLoading ? (
        <Skeleton width={180} height={180} radius={20} />
      ) : (
        <QRCode
          value={voucher?.voucher || ""}
          size={180}
          bgColor="transparent"
          fgColor="var(--text-5)"
        />
      )}

      {/* Voucher ID and Name */}
      <div className="flex flex-col items-center justify-center gap-[2px] w-full">
        {isLoading ? (
          <>
            <div className="h-[24px] flex items-center justify-center">
              <Skeleton width={80} height={12} radius={4} />
            </div>
            <div className="h-[24px] flex items-center justify-center">
              <Skeleton width={140} height={12} radius={4} />
            </div>
          </>
        ) : (
          <>
            <Body2
              weight="medium"
              className="break-all text-center overflow-wrap-anywhere max-w-full text-text-5"
              style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
            >
              {voucher?.voucher}
            </Body2>
            <Title2 weight="semibold" className="text-text-5">
              {fullName}
            </Title2>
          </>
        )}
      </div>
    </div>
  );
};

interface CarouselNavButtonProps {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}

const CarouselNavButton = ({
  direction,
  disabled,
  onClick,
  ariaLabel,
}: CarouselNavButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cls(
      "flex items-center justify-center w-[44px] h-[44px] rounded-full bg-fill-1 transition-all",
      FREEDOM_SHADOW_CLASS,
      disabled
        ? "cursor-not-allowed text-[#D7DBDD]"
        : "cursor-pointer active:scale-95 text-[var(--primary-6)]",
    )}
  >
    <SliderIcon
      className={cls(direction === "next" && "rotate-180")}
      aria-hidden
    />
  </button>
);

const PassDetailPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { track } = useTrackContext();
  const { pass_id } = router.query as { pass_id: string };

  const {
    data: pass,
    isLoading,
    isError,
    refetch,
  } = usePassesRetrieve(pass_id, {
    query: {
      enabled: !!pass_id,
    },
  });

  const vouchers = pass?.vouchers ?? [];
  const quote = pass?.quote;
  const location = quote?.resource?.location;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalVouchers = vouchers.length;
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    if (currentIndex > 0 && currentIndex >= totalVouchers) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalVouchers]);

  useEffect(() => {
    if (pass) {
      track("pass.opened", {
        pass_id: pass.id,
        airport_id: pass.quote.resource.hub.id,
        lounge_id: pass.quote.resource.id,
        guest_entries: pass.quote.passenger_count,
      });
    }
  }, [pass, track]);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    addHapticFeedback("light");
    carouselRef.current?.changeIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex >= totalVouchers - 1) return;
    addHapticFeedback("light");
    carouselRef.current?.changeIndex(currentIndex + 1);
  };

  const showNav = totalVouchers > 1;

  return (
    <Layout
      navBar={{
        title: t("Details"),
        enableAnimation: false,
      }}
      customHeader={null}
      noPaddingX
      screenState={{
        isLoading,
        isError,
        refetch,
      }}
      logo={
        <Image
          src={OthersLogo}
          alt=""
          width={DESKTOP_CONSTANTS.LOGO_WIDTH}
          height={DESKTOP_CONSTANTS.LOGO_HEIGHT}
        />
      }
    >
      <div className="flex flex-col gap-[16px]">
        {/* QR carousel: Arco's <Carousel/> handles native swipe (matches
            sibling pass-* projects).
            - Single / loading state → wrap with px-[16px] (Figma spec).
            - Multi state → use Arco's `offsetBetween={20}` so 20px of the
              adjacent QR cards peek on each side, and `spaceBetween={8}`
              for the inter-card gap (per Figma).
            `showIndicator={false}` hides Arco's default dots so we can
            render our own counter / arrow buttons below the carousel. */}
        {isLoading || vouchers.length === 0 ? (
          <div className="px-[16px]">
            <QRCard isLoading />
          </div>
        ) : vouchers.length === 1 ? (
          <div className="px-[16px]">
            <QRCard voucher={vouchers[0]} />
          </div>
        ) : (
          <Carousel
            ref={carouselRef}
            autoPlay={false}
            loop={false}
            showIndicator={false}
            // Uniform offset gives a 20px peek on both sides — keeps
            // the previous QR card visible when the user swipes to a
            // middle slide. The "no padding-left for the first item"
            // requirement is enforced via CSS (see styles.firstFlush)
            // by translating ONLY the slide at data-index="0".
            offsetBetween={20}
            spaceBetween={8}
            className={styles.qrCarousel}
            onChange={(idx) => setCurrentIndex(idx)}
          >
            {vouchers.map((voucher) => (
              <QRCard key={voucher.id} voucher={voucher} />
            ))}
          </Carousel>
        )}

        {/* Carousel controls */}
        {showNav && (
          <div className="flex items-center justify-between px-[24px] pb-[8px]">
            <CarouselNavButton
              direction="prev"
              disabled={currentIndex === 0}
              onClick={handlePrev}
              ariaLabel={t("Previous traveler")}
            />
            <Body1 weight="semibold" className="text-text-4">
              {t("Traveler {{current}} of {{total}}", {
                current: currentIndex + 1,
                total: totalVouchers,
              })}
            </Body1>
            <CarouselNavButton
              direction="next"
              disabled={currentIndex >= totalVouchers - 1}
              onClick={handleNext}
              ariaLabel={t("Next traveler")}
            />
          </div>
        )}

        {/* Info Rows */}
        <div className="px-[16px]">
          <Card className={cls("bg-fill-1 py-[8px]", FREEDOM_SHADOW_CLASS)}>
            <BookingInfoSection quote={quote} isLoading={!quote} />
          </Card>
        </div>

        {/* Location */}
        <div className="px-[16px]">
          <Card
            className={cls(
              "flex flex-col gap-[4px] bg-fill-1",
              FREEDOM_SHADOW_CLASS,
            )}
          >
            <Body1 weight="medium" className="text-text-5">
              {t("Location")}
            </Body1>
            {location ? (
              <Body2 className="text-text-4">{location}</Body2>
            ) : (
              <>
                <div className="h-[20px] flex items-center">
                  <Skeleton width="100%" height={12} />
                </div>
                <div className="h-[20px] flex items-center">
                  <Skeleton width={200} height={12} />
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Things to know */}
        <div className="px-[16px]">
          <ThingsToKnow className={FREEDOM_SHADOW_CLASS} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default PassDetailPage;
