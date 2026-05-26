import {
  Body1,
  Carousel,
  type CarouselRef,
  PopupSwiper,
  SecondaryButton,
  Title1,
  useSafeArea,
} from "@appboxo/ui-kit";
import { setIntroductionScreenDisplayedFlag } from "@boxo/esim-util";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import CloseIcon from "@/assets/icons/onboarding-close.svg";
import FreedomStubIcon from "@/assets/icons/freedom-stub.svg";

import styles from "./onboarding-drawer.module.css";

interface OnboardingSlideProps {
  id: string;
  title: string;
  description: string;
}

interface OnboardingDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const OnboardingDrawer = ({
  visible,
  onClose,
}: OnboardingDrawerProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { bottomSafeArea } = useSafeArea();

  // 1:1 with upstream `apps/pass-freedom/src/components/onboarding-drawer`:
  // all three slides intentionally render the same `FreedomStubIcon` SVG
  // placeholder. The product copy varies per slide but the imagery is a
  // single brand-neutral stub graphic, not three distinct PNGs. (The
  // public/images/slide-image-{1,2,3}.png assets are kept for parity with
  // the upstream public tree but are NOT consumed by either the drawer
  // or any other live screen.)
  const ONBOARDING_SLIDES: OnboardingSlideProps[] = [
    {
      id: "slide-image-1",
      title: t("Skip the Line"),
      description: t(
        "Pre-book Fast Track security access and breeze through airport checkpoints without long waits.",
      ),
    },
    {
      id: "slide-image-2",
      title: t("Book in a Few Taps"),
      description: t(
        "Choose your airport, terminal, and time — we'll check availability instantly.",
      ),
    },
    {
      id: "slide-image-3",
      title: t("Stress-Free Entry"),
      description: t(
        "Show your QR code at the Fast Track lane and pass security with ease.",
      ),
    },
  ];

  useEffect(() => {
    if (visible) {
      setIntroductionScreenDisplayedFlag(true);
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  const handleContinue = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      carouselRef.current?.changeIndex(currentSlide + 1);
    } else {
      onClose();
    }
  };

  return (
    <PopupSwiper
      visible={visible}
      close={handleClose}
      direction="bottom"
      allowSwipeDirections={["bottom"]}
      contentClass={styles.content}
    >
      <div className={styles.closeButton} onClick={handleClose}>
        <CloseIcon width={24} height={24} />
      </div>

      <Carousel
        ref={carouselRef}
        className={styles.carousel}
        indicatorType="circle"
        autoPlay={false}
        loop={false}
        indicatorOutside
        onChange={(index) => setCurrentSlide(index)}
      >
        {ONBOARDING_SLIDES.map(({ title, description, id }) => (
          <div className={styles.slide} key={id}>
            <div className={styles.imageContainer}>
              <FreedomStubIcon width={243} height={229} />
            </div>
            <div className={styles.textContent}>
              <Title1 className={styles.title} weight="bold">
                {title}
              </Title1>
              <Body1 className={styles.description}>{description}</Body1>
            </div>
          </div>
        ))}
      </Carousel>

      <div
        className={`${styles.footer} ${bottomSafeArea ? styles.bottomSafeArea : ""}`}
      >
        <SecondaryButton
          text={
            currentSlide === ONBOARDING_SLIDES.length - 1
              ? t("Get Fast Track pass")
              : t("Continue")
          }
          onClick={handleContinue}
        />
      </div>
    </PopupSwiper>
  );
};
