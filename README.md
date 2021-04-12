<h1 align="center">

🌀 Portal.JS<br/>
The javascript framework for<br/>
data portals

</h1>

🌀 `portal` is a framework for rapidly building rich data portal frontends using a modern frontend approach.

`portal` can be used to present a single dataset or build a full-scale data catalog/portal. `portal` is built in Javascript and React on top of the popular [Next.js][] framework.

`Portal` assumes a "decoupled" approach where the frontend is a separate service from the backend and interacts with backend(s) via an API. It can be used with any backend and has out of the box support for [CKAN][].

[ckan]: https://ckan.org/
[next.js]: https://nextjs.com/

## Features

- 🗺️ Unified sites: present data and content in one seamless site, pulling datasets from a DMS (e.g. CKAN) and content from a CMS (e.g. wordpress) with a common internal API.
- 👩‍💻 Developer friendly: built with familiar frontend tech Javascript, React etc
- 🔋 Batteries included: Full set of portal components out of the box e.g. catalog search, dataset showcase, blog etc.
- 🎨 Easy to theme and customize: installable themes, use standard CSS and React+CSS tooling. Add new routes quickly.
- 🧱 Extensible: quickly extend and develop/import your own React components
- 📝 Well documented: full set of documentation plus the documentation of NextJS and Apollo.

### For developers

- 🏗 Build with modern, familiar frontend tech such as Javascript and React.
- 🚀 NextJS framework: so everything in NextJS for free React, SSR, static site generation, huge number of examples and integrations etc.
  - SSR => unlimited number of pages, SEO etc whilst still using React.
  - Static Site Generation (SSG) (good for small sites) => ultra-simple deployment, great performance and lighthouse scores etc
- 📋 Typescript support

## Getting Started

### Setup

Install a recent version of Node. You'll need Node 10.13 or later.

### Create a Portal app

To create a Portal app start with on the examples in the `[examples directory](./examples).
