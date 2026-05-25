// Arco's component styles must be loaded *before* the kit's theme so
// that the kit's `--*` tokens win when the cascade resolves.
import "@arco-design/mobile-react/esm/style";

// The kit's component-local stylesheets (Tip's icon sizing, Card
// padding, Input borders, etc.) are extracted into a single bundle
// at build time. Import once at your app entry.
import "@appboxo/ui-kit/styles.css";

// THIS line is the entire "I am Freedom" story:
// pull in the bundled Freedom brand stylesheet as plain CSS. No Less
// loader, no overlay file, no provider configuration.
import "@appboxo/ui-kit/themes/freedom/theme.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import { App } from "./App";

// Arco mobile components are designed for a 750px-wide viewport and
// the kit compiles its sizes through Arco's `pxtorem` mixin. Setting
// `html { font-size: 50px }` makes the kit render at 1:1 on a desktop
// without distorting the mobile-first measurements. Real mobile apps
// should call `setRootPixel()` from
// `@arco-design/mobile-react/tools/flexible` instead.
document.documentElement.style.fontSize = "50px";

// The kit's brand stylesheets target `#root`. The mount node already
// has that id (see `index.html`); echoing it onto `<body>` is a
// belt-and-braces safety net for any top-level rule that reads from
// `#root` directly.
document.body.id = "root";

const INSTALL_SNIPPET = `import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/styles.css";
import "@appboxo/ui-kit/themes/freedom/theme.css";`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App
        brandName="Freedom"
        brandBlurb="Freedom uses the kit's bundled brand theme. One CSS import at the entry point and every component below picks up the green palette."
        installCaption="Add to your app entry"
        installSnippet={INSTALL_SNIPPET}
      />
    </I18nextProvider>
  </React.StrictMode>,
);
