import { Carousel } from "@arco-design/mobile-react";
import { CarouselRef } from "@arco-design/mobile-react/cjs/carousel";
import { Body1, Title1, useDesktopDetection } from "@appboxo/ui-kit";
import { useLocation } from "@/mocks/kit-extras";
import { useTrackContext } from "@/mocks/kit-extras";
import { addHapticFeedback, exit } from "@boxo/esim-util";
import { cls } from "@arco-design/mobile-utils";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import SlideImage1 from "@/../public/images/slide-image-1.png";
import SlideImage1Desktop from "@/../public/images/slide-image-1-desktop.png";
import CloseIcon from "@/assets/icons/close-icon.svg";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { setIntroductionScreenDisplayed } from "@/lib/storage";
import styles from "./index.module.css";

interface OnboardingSlideProps {
  id: string;
  title: string;
  src: StaticImageData;
  description: string;
}

interface IndicatorElement extends HTMLElement {
  __hasClickHandler?: boolean;
  __clickHandler?: (e: Event) => void;
}

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { refetch: refetchLocation } = useLocation({
    enabled: false,
    geodataParams: {
      logo: "https://res.cloudinary.com/ds4pux6du/image/upload/v1772194158/geolocation_ozngx5.png",
      title: t("Enable location services"),
      description: t("We will suggest available airports nearby"),
      allow_button: t("Allow location services"),
      skip_button: t("Skip"),
    },
  });
  const { track } = useTrackContext();
  const isDesktop = useDesktopDetection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const handleFindLounges = async () => {
    addHapticFeedback("medium");
    setIntroductionScreenDisplayed();
    track("welcome.find.click", {
      language: router.locale,
      country: undefined,
    });

    const result = await refetchLocation();
    const locationGranted = result.data?.available && result.data?.lat;
    track(
      locationGranted
        ? "welcome.allow_location.click"
        : "welcome.skip_location.click",
    );

    router.push("/airports/search");
  };

  const ONBOARDING_SLIDES: OnboardingSlideProps[] = [
    {
      id: "slide-image-1",
      title: t("Skip the Line"),
      description: t(
        "Pre-book Fast Track security access and breeze through airport checkpoints without long waits.",
      ),
      src: SlideImage1,
    },
    {
      id: "slide-image-2",
      title: t("Book in a Few Taps"),
      description: t(
        "Choose your airport, terminal, and time — we'll check availability instantly.",
      ),
      src: SlideImage1,
    },
    {
      id: "slide-image-3",
      title: t("Stress-Free Entry"),
      description: t(
        "Show your QR code at the Fast Track lane and pass security with ease.",
      ),
      src: SlideImage1,
    },
  ];

  // Make indicators clickable in desktop mode
  useEffect(() => {
    // Only attach handlers in desktop mode
    if (!isDesktop) {
      return;
    }

    const container = carouselContainerRef.current;
    if (!container) {
      return;
    }

    const attachClickHandlers = () => {
      // Find all indicator items - try both selectors
      const indicatorContainer = container.querySelector(
        ".arco-carousel-indicator",
      );
      const indicatorItems =
        indicatorContainer?.querySelectorAll(".indicator") ||
        indicatorContainer?.querySelectorAll(".indicator.type-circle");

      if (!indicatorItems || indicatorItems.length === 0) {
        return;
      }

      // Add click handlers to each indicator
      indicatorItems.forEach((indicator, index) => {
        const indicatorEl = indicator as IndicatorElement;
        // Skip if already has our click handler
        if (indicatorEl.__hasClickHandler) {
          return;
        }

        const clickHandler = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("[Carousel] Indicator clicked, index:", index);
          // Use ref method if available, otherwise use state
          const ref = carouselRef.current;
          if (ref && typeof ref.changeIndex === "function") {
            ref.changeIndex(index);
            setCurrentIndex(index);
          } else {
            // Fallback to state update
            setCurrentIndex(index);
          }
        };

        indicator.addEventListener("click", clickHandler, true); // Use capture phase
        indicatorEl.__hasClickHandler = true;
        indicatorEl.__clickHandler = clickHandler;
        indicatorEl.style.cursor = "pointer";
        indicatorEl.style.pointerEvents = "auto";

        // Also ensure parent container allows pointer events
        if (indicatorContainer) {
          (indicatorContainer as HTMLElement).style.pointerEvents = "auto";
        }
      });
    };

    // Attach handlers after carousel renders
    const timeoutId = setTimeout(attachClickHandlers, 100);

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      attachClickHandlers();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();

      // Clean up click handlers
      const indicatorContainer = container.querySelector(
        ".arco-carousel-indicator",
      );
      const indicatorItems = indicatorContainer?.querySelectorAll(".indicator");
      indicatorItems?.forEach((indicator) => {
        const indicatorEl = indicator as IndicatorElement;
        if (indicatorEl.__clickHandler) {
          indicator.removeEventListener("click", indicatorEl.__clickHandler);
          indicatorEl.__hasClickHandler = false;
          indicatorEl.__clickHandler = undefined;
        }
      });
    };
  }, [isDesktop]);

  // Desktop: custom auto-advance (Carousel's autoPlay doesn't run when container was hidden during hydration)
  const slideCount = ONBOARDING_SLIDES.length;
  useEffect(() => {
    if (!isDesktop || slideCount <= 1) return;
    const id = setInterval(() => {
      const next =
        currentIndexRef.current >= slideCount - 1
          ? 0
          : currentIndexRef.current + 1;
      carouselRef.current?.changeIndex?.(next);
    }, 4000);
    return () => clearInterval(id);
  }, [isDesktop, slideCount]);

  return (
    <Layout
      navBar={{
        onClickLeft: exit,
        onClickRight: exit,
        leftContent: <CloseIcon />,
        hideBack: false, // Always show close button (leftContent) on onboarding
      }}
      footer={{
        primaryButton: {
          text: t("Get Fast Track pass"),
          onClick: handleFindLounges,
        },
        secondaryButton: {
          text: t("Help Center"),
          href: "/help",
        },
      }}
      noPaddingX
      contentClassName={isDesktop ? styles.noLeftMargin : undefined}
    >
      <div ref={carouselContainerRef}>
        {isDesktop ? (
          /* Desktop: Static image at top, carousel for text only */
          <>
            <div className={styles.staticImageDesktop}>
              <Image
                src={SlideImage1Desktop}
                alt={""}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <Carousel
              ref={carouselRef}
              className={styles.container}
              indicatorType="circle"
              autoPlay={false}
              loop={false}
              indicatorOutside
              onChange={(index) => {
                setCurrentIndex(index);
              }}
            >
              {ONBOARDING_SLIDES.map(({ title, description, id }) => (
                <div className={styles.screen} key={id}>
                  <div className={styles.content}>
                    <Title1 className={styles.title} weight="bold">
                      {title}
                    </Title1>
                    <Body1 className={styles.description}>{description}</Body1>
                  </div>
                </div>
              ))}
            </Carousel>
          </>
        ) : (
          /* Mobile: Fixed image at top (like esim-finom) - shows current slide's image */
          <>
            <div className={styles.staticImage}>
              {ONBOARDING_SLIDES.map(({ src, id }, index) => (
                <div
                  key={id}
                  className={cls(
                    styles.imageSlide,
                    currentIndex === index && styles.imageSlideActive,
                  )}
                >
                  <Image
                    src={src}
                    alt={""}
                    priority={index === 0}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
            {/* Carousel only contains text content (like esim-finom) */}
            <Carousel
              ref={carouselRef}
              className={styles.container}
              indicatorType="circle"
              autoPlay={false}
              loop={false}
              indicatorOutside
              onChange={(index) => {
                setCurrentIndex(index);
              }}
            >
              {ONBOARDING_SLIDES.map(({ title, description, id }) => (
                <div className={styles.screen} key={id}>
                  <div className={styles.content}>
                    <Title1 className={styles.title} weight="bold">
                      {title}
                    </Title1>
                    <Body1 className={styles.description}>{description}</Body1>
                  </div>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps = getServerSideTranslations;
