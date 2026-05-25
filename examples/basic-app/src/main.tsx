// Arco component styles must be imported before any kit theme so
// that the kit's `--*` tokens win when the cascade resolves.
import "@arco-design/mobile-react/esm/style";

// Kit's component-local stylesheets (Tip icon sizing, Card padding,
// Input borders, etc.). Bundled at build time; import once at entry.
import "@appboxo/ui-kit/styles.css";

// Pre-compiled brand stylesheet. Most consumers will reach for the
// `.css` rather than the `.less` source -- it doesn't require a LESS
// pipeline in their app.
import "@appboxo/ui-kit/themes/freedom/theme.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "@arco-design/mobile-react";
import { I18nextProvider } from "react-i18next";
import { setHapticHandler } from "@appboxo/ui-kit";

import i18n from "./i18n";
import { App } from "./App";

// Plug in optional host capabilities. Defaults are no-ops, so the
// kit works fine without this -- it's here to demonstrate the hook.
setHapticHandler((style) => {
  console.log(`[haptic] ${style}`);
});

// Kit brand stylesheets target `#root` for theming. `index.html`
// already mounts on a `<div id="root">`; mirroring the id on <body>
// is a safety net so any top-level styles that read `#root` resolve
// even before React paints.
document.body.id = "root";

// Arco Mobile is laid out against a 750px artboard and the kit's
// sizes are compiled with `pxtorem(value / 50)`. Without an explicit
// root font-size, 1rem defaults to 16px and the page renders at
// roughly 3x scale on desktop. The other examples
// (kitchen-sink, freedom-theme, custom-theme) all do the same.
document.documentElement.style.fontSize = "50px";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider system="ios" useRtl={false}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ContextProvider>
  </React.StrictMode>,
);
