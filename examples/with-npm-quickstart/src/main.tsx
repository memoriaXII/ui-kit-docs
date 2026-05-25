// Exactly the three import lines a team would add to their own app
// entry. Notice that the kit ships pre-compiled CSS for both the
// component-local styles (`/styles.css`) and each bundled brand
// (`/themes/<brand>/theme.css`) -- no Less pipeline required.
import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/styles.css";
import "@appboxo/ui-kit/themes/freedom/theme.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

// The kit's brand stylesheets target `#root`; mirror what the other
// example apps do so the brand tokens take effect on <body>'s subtree.
document.body.id = "root";

// Arco's `pxtorem` mixin is designed for a 750px-wide mobile viewport.
// 50px is the kit's standard desktop-1:1 root font-size and matches
// the rest of the in-repo examples.
document.documentElement.style.fontSize = "50px";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
