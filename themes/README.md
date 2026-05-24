# Theming

`@appboxo/ui-kit` is built on top of Arco Mobile and is themed entirely
through CSS custom properties (design tokens). To create a brand you
provide a `theme.less` file (or just a CSS overlay) that overrides the
tokens — no JavaScript needed.

## Layout

```
themes/
├── base.less          # required base reset and global styles
├── typography.less    # shared typography classes
├── default/           # brand-neutral baseline — every required token,
│   ├── theme.less     #   safe out of the box. iOS system-blue primary.
│   └── theme.css      # ── generated; re-run `pnpm build:themes` after editing the .less
└── <brand>/           # 36 partner brands (adib … voucher-snoo)
    ├── theme.less     # extends `../default/theme.less` and declares
    │                  #   only the tokens that differ from the baseline
    ├── theme.css      # ── generated
    └── index.js       # entry that imports Arco styles + theme
```

## Brand catalog

The kit ships 36 partner brands plus the neutral `default`. Toggle
between them with the **Brand** dropdown in Storybook, or import the
one you want directly:

```ts
import "@appboxo/ui-kit/themes/<brand>/theme.css";
```

| Group | Brands |
|---|---|
| Core | `default`, `freedom`, `generic`, `base`, `storybook` |
| Pass family | `pass-finom`, `pass-telegram` |
| Lounge family | `lounge-adib`, `lounge-telegram` |
| Voucher family | `voucher-riyad`, `voucher-snoo` |
| Hotel | `hotel-telegram` |
| Bank / fintech | `adib`, `aya`, `dana`, `dolphin`, `extsy`, `finom`, `forma`, `hyra`, `kem`, `maya`, `mbank`, `mcash`, `minipay`, `moni`, `nectarfi`, `ogold`, `reab`, `remittance`, `riyad`, `saib`, `sajda`, `sindibad`, `snoonu`, `telegram`, `tfh`, `uab` |

All 36 brands were generated from the historical
`boxo-miniapps/packages/esim-theme/src/<brand>/theme.less` files via
[`scripts/migrate-esim-theme.mjs`](../scripts/migrate-esim-theme.mjs),
which converts `:root` → `#root`, diffs every declaration against
`themes/default/theme.less`, and rewrites each brand to extend the
default and declare only the tokens that actually differ.

The migration is re-runnable; if you ever need to refresh from the
historical source, run:

```bash
node scripts/migrate-esim-theme.mjs --source <path-to-esim-theme/src>
```

## Three ways to consume the kit's theme

Pick one based on how much you want to control. All three only require
that the host's root element has `id="root"`.

### 1. "I am one of the bundled brands" — use it as-is

The kit ships 36 partner brands (see catalog above). Import the
matching `theme.css`:

```ts
// host app entry
import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/themes/freedom/theme.css";  // or any other bundled brand
```

### 2. "I am another brand, light overlay" — extend the neutral baseline

Recommended when you only want to swap a handful of tokens (typically
just the primary palette).

```ts
import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/themes/default/theme.css";   // ✨ neutral baseline
import "@/styles/my-brand.css";                       // your overrides
```

`my-brand.css` only needs to declare the tokens that differ:

```css
#root {
  --primary-1: #fff5eb;
  --primary-2: #ffe2c5;
  --primary-3: #ffb16d;
  --primary-6: #ff7a00;
  --primary-7: #cc6200;
}

#root.arco-theme-dark {
  --primary-6: #ff7a00;
  --primary-7: #cc6200;
}
```

Order matters: import the kit's theme **first**, then your overrides.

### 3. "I want full control" — replace the theme entirely

Skip the kit's `default/` token set and supply every token yourself.
You still need `base.less` for the `pxtorem` mixin and reset.

```less
// host-app/styles/my-brand.less
@import "~@appboxo/ui-kit/themes/base.less";

#root {
  // …declare every token from the contract below…
}

#root.arco-theme-dark {
  // …same for dark…
}
```

If your bundler doesn't handle `.less` (e.g. stock Next.js), pre-compile
it to `.css` and import the result instead. The kit ships both for its
own themes for that reason.

## Token contract

The kit's components in `src/` read the following token families. To
keep components rendering correctly your theme must declare each
**required** token at least once under `#root`. Tokens with a fallback
are optional handles for finer brand control.

### Color tokens

| Token | Required | Purpose |
|---|---|---|
| `--text-1` … `--text-5` | ✅ | Foreground colours, light → dark on light surface |
| `--text-1-static`, `--text-5-static` | ✅ | Variants that don't flip in dark mode |
| `--fill-1` … `--fill-4`, `--fill-white` | ✅ | Surfaces, from primary card to page background |
| `--primary-1` … `--primary-7` | ✅ | Brand accent palette |
| `--primary-color` | ✅ | Alias of `--primary-6` |
| `--success-1` … `--success-7` | ✅ | Success status |
| `--danger-1` … `--danger-7` | ✅ | Destructive / error |
| `--warning-1` … `--warning-8` | ✅ | Warning |
| `--info-1`, `--info-2` | ✅ | Informational accents |
| `--line-1` | ✅ | Dividers, borders |

### Layout tokens

| Token | Required | Purpose |
|---|---|---|
| `--side-padding` | ✅ | Horizontal page gutter |
| `--layout-padding` | ✅ | Padding of the legacy `Layout` content area |
| `--footer-padding` / `-gap` / `-scrollable-shadow` | ✅ | Legacy `Layout` footer |
| `--boxo-layout-mobile-padding` / `-footer-*` | ✅ | The newer `ResponsiveLayout` mobile layer |
| `--nav-bar-height`, `--nav-bar-two-sides-padding` | ✅ | Top nav bar |

### Component tokens

Most are Arco-style names; kit-specific additions use the `--boxo-`
prefix.

| Token | Required | Read by |
|---|---|---|
| `--button-primary-*`, `--button-default-*`, `--button-ghost-*` | ✅ | Arco button (via kit's wrappers) |
| `--tertiary-button-*` | ✅ | `src/button` (kit-only "tertiary" variant) |
| `--quaternary-button-*` | ✅ | `src/button` (kit-only outline variant) |
| `--boxo-card-mobile-background` / `-active-background` | ✅ | `src/card` |
| `--boxo-card-mobile-padding` / `-border-*` / `-shadow` | ⚪️ optional | `src/card` (have fallbacks) |
| `--boxo-input-disabled-background` | ✅ | `src/input` |
| `--boxo-input-border-*` / `-background` / `-active-border-color` | ⚪️ optional | `src/input` (have fallbacks) |
| `--boxo-dial-code-selector-item-active-background` | ✅ | `src/dial-code-selector` |
| `--toast-background`, `--toast-text-color`, `--toast-*` | ✅ | `src/toast` |
| `--boxo-toast-error-*` | ⚪️ optional | `src/toast` (fallback to `--toast-*`) |
| `--search-bar-input-wrapper-background-color`, `--search-bar-*` | ✅ | `src/search-bar` |
| `--cell-*` | ✅ | Arco Cell (via `src/cell`) |
| `--tabs-tab-bar-*` | ✅ | Arco Tabs |
| `--carousel-indicator-*` | ✅ | Arco Carousel |
| `--skeleton-paragraph-*` | ✅ | Arco Skeleton |

`pnpm test:tokens` re-derives this list from `src/` and verifies
`themes/default/theme.less` declares every required token. Run it
after touching component CSS.

## Adding a new brand

```bash
cp -R themes/freedom themes/<your-brand>
```

Then edit `themes/<your-brand>/theme.less`. Two starter templates:

1. **Extend `default/`** (recommended; matches what `freedom/` does):
   ```less
   @import "../default/theme.less";
   #root {
     --primary-1: #...;
     --primary-6: #...;
     // …only what differs…
   }
   ```
2. **Standalone** (full control):
   ```less
   @import "../base.less";
   #root {
     // …declare every required token…
   }
   ```

Run `pnpm build:themes` to (re)generate the matching `theme.css`. The
`.less` is the source of truth; the `.css` is committed so consumers
that don't process Less can `import` it directly.

## Dark mode

Tokens under `#root.arco-theme-dark` are used when the host app sets the
`arco-theme-dark` class on `#root`. Override `--dark-*` tokens (and any
`--primary-*` that should differ) as needed. See
`themes/default/theme.less` for the full list.

## Documenting custom tokens

If you add a new `--boxo-*` token, document it in the corresponding
component's Storybook page so consumers can discover it, and make sure
`pnpm test:tokens` still passes.
