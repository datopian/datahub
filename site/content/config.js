const config = {
  title:
    "Portal.JS",
  description:
    "Portal.JS is a framework for rapidly building rich data portal frontends using a modern frontend approach. portal.js can be used to present a single dataset or build a full-scale data catalog/portal.",
  theme: {
    default: "dark",
    toggleIcon: "/images/theme-button.svg",
  },
  author: "Datopian",
  authorLogo: "/datopian-logo.png",
  authorUrl: "https://datopian.com/",
  navbarTitle: {
    // logo: "/images/logo.svg",
    text: "🌀 Portal.JS",
    // version: "Alpha",
  },
  navLinks: [
    { name: "Docs", href: "/docs" },
    // { name: "Components", href: "/docs/components" },
    { name: "Blog", href: "/blog" },
    // { name: "Gallery", href: "/gallery" },
    // { name: "Data Literate", href: "/data-literate" },
    // { name: "DL Demo", href: "/data-literate/demo" },
    // { name: "Excel Viewer", href: "/excel-viewer" },
  ],
  footerLinks: [],
  nextSeo: {
    openGraph: {
      type: "website",
      title:
        "Portal.JS - Rapidly build rich data portals using a modern frontend framework",
      description:
        "Portal.JS is a framework for rapidly building rich data portal frontends using a modern frontend approach. portal.js can be used to present a single dataset or build a full-scale data catalog/portal.",
      locale: "en_US",
      images: [
        {
          url: "https://datahub.io/static/img/opendata/product.png",  //  TODO
          alt: "Portal.JS - Rapidly build rich data portals using a modern frontend framework",
          width: 1200,
          height: 627,
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
  discord: "https://discord.gg/An7Bu5x8",
  tableOfContents: true,
  // analytics: "xxxxxx",
  // editLinkShow: true,
};
export default config;
