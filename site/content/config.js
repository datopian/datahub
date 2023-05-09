const config = {
  title:
    "PortalJS",
  description:
    "PortalJS is a framework for rapidly building rich data portal frontends using a modern frontend approach. PortalJS can be used to present a single dataset or build a full-scale data catalog/portal.",
  theme: {
    default: "dark",
    toggleIcon: "/images/theme-button.svg",
  },
  author: "Datopian",
  authorLogo: "/datopian-logo.png",
  authorUrl: "https://datopian.com/",
  navbarTitle: {
    // logo: "/images/logo.svg",
    text: "🌀 PortalJS",
    // version: "Alpha",
  },
  navLinks: [
    { name: "Docs", href: "/docs" },
    // { name: "Components", href: "/docs/components" },
    { name: "Blog", href: "/blog" },
    { name: "Showcases", href: "/#showcases" },
    { name: "Examples", href: "https://github.com/datopian/portaljs/tree/main/examples", target: "_blank" },
    // { name: "DL Demo", href: "/data-literate/demo" },
    // { name: "Excel Viewer", href: "/excel-viewer" },
  ],
  footerLinks: [],
  nextSeo: {
    openGraph: {
      type: "website",
      title:
        "PortalJS - rapidly build rich data portals using a modern frontend framework.",
      description:
        "PortalJS is a framework for rapidly building rich data portal frontends using a modern frontend approach. PortalJS can be used to present a single dataset or build a full-scale data catalog and portal.",
      locale: "en_US",
      images: [
        {
          url: "/homepage-screenshot.png",  //  TODO
          alt: "PortalJS - rapidly build rich data portals using a modern frontend framework.",
          width: 1280,
          height: 720,
          type: "image/jpg",
        },
      ],
    },
    twitter: {
      handle: "@datopian",
      site: "https://datopian.com/",
      cardType: "summary_large_image",
    },
  },
  github: "https://github.com/datopian/portaljs",
  discord: "https://discord.gg/EeyfGrGu4U",
  tableOfContents: true,
  analytics: "G-96GWZHMH57",
  // editLinkShow: true,
};
export default config;
