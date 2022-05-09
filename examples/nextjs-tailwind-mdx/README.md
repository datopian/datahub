# Next.js + Tailwind CSS + MDX Starter Template

A starter template for Next.JS with Tailwind and MDX. Intentionally limited feature-set to keep things simple. (If you want a more comprenhensive starter template check out https://github.com/timlrx/tailwind-nextjs-starter-blog).

Includes instructions on how to rapidly customize the site.

Preview online at https://nextjs-tailwind-mdx-tau.vercel.app

## Features

Pre-configured with the following;

* Tailwind for easy styling. Booted off NextJS default tailwindcss example (https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
* Markdown / MDX rendering support. All markdown/MDX in `/content/` gets auto-rendered into the site.
* Configurable e.g. site title etc (secret config in environment variables). See `Configuration` below.
* Simple theming via `components/Layout.js`. Used to provide a standard them for all pages. Customizable NavBar and Footer with configurable nav links.
* Analytics: Google analytics support following https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
* SEO: basic SEO out of the box (via https://github.com/garmeeh/next-seo)

## Usage

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/datopian/nextjs-tailwind-mdx myapp
# or
yarn create next-app --example https://github.com/datopian/nextjs-tailwind-mdx myapp
```

Then run the app:

```bash
cd myapp
npm run dev
```

## Configuration

See `config` directory:

* `config/siteConfig.js` for site wide configuration especially for general theme (e.g. title) and SEO
* `config/navLinks.js` for configuration of navigation links

### How to customize the content directory location?

Open up `pages/[...slug].js` and change the `CONTENT_PATH` variable.

### Theming

We suggest the following:

* Replace the favicon in `public/favicon.ico` or use the svg favicon ...
* Add a logo: add image to `public` e.g. then open `components/layout.js` and replace footer logo link

Tweaking the theme in general: open up `components/Layout.js` and tweak away.

