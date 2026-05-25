import { useEffect, useLayoutEffect, useState } from "react";

import { ContextProvider } from "@arco-design/mobile-react";

import { BrandToolbar, DEFAULT_BRAND } from "./BrandToolbar";
import { TypographySection } from "./sections/TypographySection";
import { ColorTokensSection } from "./sections/ColorTokensSection";
import { ButtonsSection } from "./sections/ButtonsSection";
import { InputsSection } from "./sections/InputsSection";
import { DisplaySection } from "./sections/DisplaySection";
import { LayoutSection } from "./sections/LayoutSection";
import { InteractiveSection } from "./sections/InteractiveSection";
import { IconsSection } from "./sections/IconsSection";

const STORAGE_KEY_BRAND = "kitchen-sink:brand";
const STORAGE_KEY_DARK = "kitchen-sink:dark";

function readBrand(): string {
  if (typeof window === "undefined") return DEFAULT_BRAND;
  return window.localStorage.getItem(STORAGE_KEY_BRAND) ?? DEFAULT_BRAND;
}

function readDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY_DARK) === "1";
}

export function App() {
  const [brand, setBrand] = useState<string>(readBrand);
  const [dark, setDark] = useState<boolean>(readDark);
  // A change-able value to thread into sections that resolve CSS
  // custom-property values at runtime (e.g. the color-token grid).
  // Encoding both inputs as a string is enough to invalidate any
  // useEffect / useLayoutEffect that depends on it.
  const brandTick = `${brand}|${dark ? "dark" : "light"}`;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_BRAND, brand);
  }, [brand]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_DARK, dark ? "1" : "0");
  }, [dark]);

  // Match what host apps and the Storybook decorator do: only
  // `useDarkMode` on Arco's ContextProvider would NOT swap the kit's
  // own `#root.arco-theme-dark` tokens, so flip the class on #root
  // ourselves to align brand stylesheets with Arco's runtime mode.
  //
  // useLayoutEffect rather than useEffect: ColorTokensSection reads
  // getComputedStyle in its own useLayoutEffect to render hex
  // labels next to the swatches; the labels would otherwise lag one
  // toggle behind because the regular useEffect runs after paint.
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    root.classList.toggle("arco-theme-dark", dark);
  }, [dark]);

  return (
    <ContextProvider system="ios" useRtl={false} useDarkMode={dark}>
      <BrandToolbar
        brand={brand}
        onBrandChange={setBrand}
        dark={dark}
        onDarkChange={setDark}
      />

      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 24px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 48,
          color: "var(--text-5)",
          background: "var(--fill-white)",
          minHeight: "100vh",
        }}
      >
        <Hero brand={brand} />
        <ColorTokensSection brandTick={brandTick} />
        <TypographySection />
        <ButtonsSection />
        <InputsSection />
        <DisplaySection />
        <LayoutSection />
        <InteractiveSection />
        <IconsSection />
      </main>
    </ContextProvider>
  );
}

function Hero({ brand }: { brand: string }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h1
        style={{
          margin: 0,
          color: "var(--text-5)",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        Kitchen sink ·{" "}
        <span style={{ color: "var(--primary-6)" }}>{brand}</span>
      </h1>
      <p style={{ margin: 0, color: "var(--text-4)", fontSize: 14 }}>
        Every <code>@appboxo/ui-kit</code> export rendered on a single page.
        Use the brand dropdown above to A/B compare across all 36 partner
        themes; nothing reloads, the active brand stylesheet swaps in place.
      </p>
    </header>
  );
}
