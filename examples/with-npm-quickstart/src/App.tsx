// Intentionally small. The job of this example is to prove that an
// outside consumer who runs
//
//   pnpm add @appboxo/ui-kit
//
// can `import` from `@appboxo/ui-kit` and render real components --
// nothing more. The richer demos (`examples/freedom-theme`,
// `examples/kitchen-sink`) live in this repo for showcase / brand
// review; this one exists to verify the *publish* pipeline rather
// than the design.

import { useState } from "react";
import {
  Body1,
  Body2,
  Card,
  Flex,
  Footnote2,
  Input,
  LargeTitle,
  PrimaryButton,
  SecondaryButton,
  Tip,
  Toast,
} from "@appboxo/ui-kit";

export const App = () => {
  const [name, setName] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "var(--fill-1)", color: "var(--text-5)" }}>
      <Flex
        vertical
        gap={20}
        style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}
      >
        <Flex vertical gap={4}>
          <Footnote2 color="text-3">@appboxo/ui-kit · external consumer</Footnote2>
          <LargeTitle>Installed from npm</LargeTitle>
          <Body2 color="text-3">
            The kit was pulled straight from the npm registry as
            <code> @appboxo/ui-kit</code>. If you can read this and the
            buttons below are Freedom green, the published artefact is
            consumable end-to-end.
          </Body2>
        </Flex>

        <Card>
          <Flex vertical gap={12}>
            <Body1 weight="semibold">Your name</Body1>
            <Input
              value={name}
              onChange={(_e, val) => setName(val)}
              placeholder="Type to see the focus ring repaint"
            />
          </Flex>
        </Card>

        <Tip text="Tip's icon should be ~20px and read --info-* tokens. If it's huge or invisible, the kit's component CSS bundle didn't load." />

        <Flex gap={8} wrap="wrap">
          <PrimaryButton text="Primary" onClick={() => Toast.info("Primary tapped")} />
          <SecondaryButton text="Secondary" onClick={() => Toast.info("Secondary tapped")} />
        </Flex>
      </Flex>
    </div>
  );
};
