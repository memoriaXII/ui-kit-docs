import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const SCROLL_POSITION_KEY = "help-center-scroll-position";

export function useScrollPosition() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const saveScrollPosition = () => {
    const scrollContainer = document.querySelector(
      '[class*="content"]',
    ) as HTMLElement | null;
    if (scrollContainer) {
      const scrollTop = scrollContainer.scrollTop;
      sessionStorage.setItem(SCROLL_POSITION_KEY, scrollTop.toString());
    }
  };

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
      const scrollContainer = document.querySelector(
        '[class*="content"]',
      ) as HTMLElement | null;
      if (scrollContainer) {
        const scrollTop = parseInt(savedPosition, 10);
        scrollContainer.scrollTop = scrollTop;
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      }
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      saveScrollPosition();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { contentRef, saveScrollPosition, restoreScrollPosition };
}
