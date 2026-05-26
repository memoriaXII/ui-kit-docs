import { cls } from "@arco-design/mobile-utils";
import {
  Body1,
  FooterProps,
  Headline,
  LargeTitle,
  Layout as BaseLayout,
  LayoutProps as BaseLayoutProps,
  NavBarProps,
  Title1,
  Title3,
} from "@appboxo/ui-kit";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  ComponentProps,
  ReactNode,
  isValidElement,
  useCallback,
  useMemo,
} from "react";

import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import ErrorIcon from "@/assets/icons/error.svg";
import {
  hasInternalHistory,
  markGoingBack,
  resetHistory,
} from "@/lib/nav-history";

import styles from "./layout.module.css";

// Scroll threshold (in px) after which the NavBar reveals its title via
// Arco's built-in `showOffset` animation. NOT the actual NavBar height —
// that is controlled by the `--nav-bar-height` CSS variable in global.css.
const NAV_BAR_SHOW_OFFSET = 50;

// Freedom brand uses a more prominent scroll shadow than the kit default.
const FREEDOM_SCROLL_SHADOW = {
  boxShadow: "0 4px 40px 0 rgba(0, 0, 0, 0.10)",
};

export interface LayoutProps extends Omit<
  BaseLayoutProps,
  "header" | "footer" | "navBar"
> {
  /** Page title rendered as LargeTitle in the content area. */
  headerTitle?: string;
  customHeader?: ReactNode;
  mockStatusBar?: boolean;
  /** Title that takes over the NavBar once the user scrolls past 20px. */
  scrollTitle?: string;
  navBar?: NavBarProps;
  footer?: FooterProps | ReactNode;
  /** Desktop-era props kept for API compatibility; no-op on mobile layout. */
  logo?: ReactNode;
  stickyHeaderContent?: ReactNode;
}

const LayoutTitle = ({ title }: { title: string }) => {
  return (
    <div className={styles.header}>
      <LargeTitle weight="bold">{title}</LargeTitle>
    </div>
  );
};

const truncateText = (text: string, maxLength = 20): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
};

// Wrap a plain string in Freedom's NavBar typography. Pass-through for any
// non-string ReactNode so consumers can still supply custom JSX.
const wrapTitle = (title: ReactNode | undefined): ReactNode => {
  if (title == null || typeof title !== "string") return title;
  return <Headline weight="bold">{title}</Headline>;
};

export const Layout = ({
  children,
  navBar,
  errorPlaceholder,
  screenState,
  footer,
  headerTitle,
  customHeader,
  scrollTitle,
  mockStatusBar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logo: _logo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stickyHeaderContent: _stickyHeaderContent,
  ...props
}: LayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const header = headerTitle ? (
    <LayoutTitle title={headerTitle} />
  ) : (
    customHeader
  );

  const handleBack = useCallback(() => {
    if (!hasInternalHistory()) {
      resetHistory();
      router.replace("/passes");
      return;
    }
    markGoingBack();
    router.back();
  }, [router]);

  // Adapter on top of kit's `Layout` NavBar:
  //   - Default back button uses pass-freedom's history-aware nav helper.
  //   - String titles are auto-wrapped in `<Headline weight="bold">`.
  //   - `scrollTitle` is forwarded to the kit's built-in scroll-swap API
  //     (no scroll tracking duplicated here anymore).
  //   - Freedom-specific scroll shadow overrides the kit default.
  const processedNavBar: NavBarProps | undefined = useMemo(() => {
    if (!navBar) return undefined;

    const backButton = (
      <div
        role="button"
        aria-label="Go back"
        onClick={(e) => {
          e.stopPropagation();
          handleBack();
        }}
        style={{ cursor: "pointer", display: "inline-flex" }}
      >
        <ArrowBackIcon
          className={cls(styles.backIcon, {
            [styles.hide as string]: navBar.hideBack,
          })}
          aria-hidden
        />
      </div>
    );

    return {
      ...navBar,
      title: wrapTitle(navBar.title),
      scrollTitle: scrollTitle
        ? wrapTitle(truncateText(scrollTitle, 20))
        : navBar.scrollTitle,
      leftContent:
        navBar.leftContent !== undefined ? navBar.leftContent : backButton,
      rightContent:
        navBar.rightContent !== undefined ? navBar.rightContent : null,
      showOffset: NAV_BAR_SHOW_OFFSET,
      scrollStyle: navBar.scrollStyle ?? FREEDOM_SCROLL_SHADOW,
    };
  }, [navBar, scrollTitle, handleBack]);

  const genericErrorPlaceholder: ComponentProps<
    typeof BaseLayout
  >["errorPlaceholder"] = {
    icon: <ErrorIcon width={84} height={84} />,
    title: (
      <Title1 weight="bold" className="text-text-5 w-[280px] mb-[12px]">
        {t("Oops! We've hit a problem")}
      </Title1>
    ),
    subtitle: (
      <Body1 className="text-text-4 w-[280px]">
        {t("Please try again later")}
      </Body1>
    ),
    button: screenState?.refetch
      ? {
          type: "primary" as const,
          bgColor: undefined,
          color: undefined,
          text: t("Update"),
          onClick: screenState.refetch,
        }
      : undefined,
  };

  // Wrap footer button labels in Title3 semibold (esim-freedom styling).
  const processedFooter = useMemo(() => {
    if (!footer) return undefined;

    // ReactNode footer (JSX) — pass through unchanged.
    if (isValidElement(footer)) {
      return footer;
    }

    const f = footer as FooterProps;
    return {
      ...f,
      primaryButton: f.primaryButton
        ? {
            ...f.primaryButton,
            size: "huge" as const,
            text: <Title3 weight="semibold">{f.primaryButton.text}</Title3>,
          }
        : undefined,
      secondaryButton: f.secondaryButton
        ? {
            ...f.secondaryButton,
            size: "huge" as const,
            text: <Title3 weight="semibold">{f.secondaryButton.text}</Title3>,
          }
        : undefined,
      tertiaryButton: f.tertiaryButton
        ? {
            ...f.tertiaryButton,
            size: "huge" as const,
            text: <Title3 weight="semibold">{f.tertiaryButton.text}</Title3>,
          }
        : undefined,
    };
  }, [footer]);

  const { contentClassName, ...restProps } = props;

  return (
    <BaseLayout
      {...restProps}
      contentClassName={cls("layout-scroll-indicator", contentClassName)}
      navBar={processedNavBar}
      header={header}
      mockStatusBar={mockStatusBar ?? false}
      screenState={screenState}
      errorPlaceholder={errorPlaceholder ?? genericErrorPlaceholder}
      footer={processedFooter}
    >
      {children}
    </BaseLayout>
  );
};

Layout.Footer = BaseLayout.Footer;

export default Layout;
