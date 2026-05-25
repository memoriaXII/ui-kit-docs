import "@arco-design/mobile-react/tools/touch2mouse";
import "@arco-design/mobile-react/esm/style";

// Always pull the kit's neutral baseline. The brand toolbar later
// stacks a brand stylesheet on top by mutating a single <style> tag,
// so default's tokens are guaranteed to back-stop anything a brand
// doesn't redeclare.
import "@appboxo/ui-kit/themes/default/theme.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

// The kit targets `#root` for theming -- mirror what the host apps
// do (basic-app, pass-freedom both set `body.id = "root"`) so brand
// tokens take effect.
document.body.id = "root";

// Arco's mobile components were designed for a 750px-wide design.
// Setting `html { font-size: 50px }` makes the kit's `pxtorem`
// outputs render at 1:1 on a desktop (1rem = 50px). Without this,
// the entire page would render at ~10x scale.
document.documentElement.style.fontSize = "50px";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
