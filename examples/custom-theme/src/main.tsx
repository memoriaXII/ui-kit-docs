// Arco's component styles must be loaded *before* the kit's theme so
// that the kit's `--*` tokens win when the cascade resolves.
import "@arco-design/mobile-react/esm/style";

// The kit's component-local stylesheets (Tip's icon sizing, Card
// padding, Input borders, etc.) are extracted into a single bundle
// at build time. Import once at your app entry.
import "@appboxo/ui-kit/styles.css";

// Step 1: pull in the kit's *neutral baseline*. This declares every
// `--*` token the kit's components depend on, with brand-safe defaults.
import "@appboxo/ui-kit/themes/default/theme.css";

// Step 2: stack your own brand on top. The overlay only needs to
// re-declare the tokens that genuinely differ -- typically the
// `--primary-*` palette. See `./styles/my-brand.css` for what 30 lines
// of CSS look like.
import "./styles/my-brand.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import { App } from "./App";

// See the comment in `examples/freedom-theme/src/main.tsx` for why
// we hard-code root font-size on the desktop demo.
document.documentElement.style.fontSize = "50px";
document.body.id = "root";

const INSTALL_SNIPPET = `import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/styles.css";
import "@appboxo/ui-kit/themes/default/theme.css";
import "./styles/my-brand.css";`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App
        brandName="Citrus"
        brandBlurb="Citrus is a fictional partner brand. It pulls the kit's default theme, then overrides only --primary-* (and a couple of friends) in 30 lines of CSS."
        installCaption="Add to your app entry"
        installSnippet={INSTALL_SNIPPET}
      />
    </I18nextProvider>
  </React.StrictMode>,
);
