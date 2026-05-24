export const siteConfig = {
  name: "Appboxo UI Kit",
  url: "https://appboxo-ui-kit.local",
  ogImage: "https://appboxo-ui-kit.local/og.jpg",
  description:
    "A themeable, host-agnostic React UI kit for Boxo and partner mini-apps.",
  /**
   * The kit is package-aliased on npm while we wait for the official
   * @appboxo/* publish token. Consumers install via:
   *   pnpm add @appboxo/ui-kit@npm:@rex-taiwan/ui-kit
   * so their `import` statements never change.
   */
  packageName: "@appboxo/ui-kit",
  npmAlias: "@rex-taiwan/ui-kit",
  installCommand:
    "pnpm add @appboxo/ui-kit@npm:@rex-taiwan/ui-kit",
  links: {
    twitter: "",
    github: "https://github.com/Appboxo/ui-kit",
  },
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
    {
      href: "/examples",
      label: "Examples",
    },
  ],
  utm: {
    main: "",
    agents: "",
    sales: "",
  },
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
