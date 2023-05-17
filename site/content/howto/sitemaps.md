# How to build a sitemap?

- install the following packages

```
npm install globby prettier @flowershow/markdowndb
```

- Add the following script to a `/scripts/sitemap.mjs` file in your project

```
import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { MarkdownDB } from "@flowershow/markdowndb";

const dbPath = "markdown.db";
const client = new MarkdownDB({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
});

const clientPromise = client.init();

export default async function sitemap() {
  const prettierConfig = await prettier.resolveConfig("");
  const mddb = await clientPromise;
  const allFiles = await mddb.getFiles({ extensions: ["mdx", "md"] });
  const contentPages = allFiles
    .filter((x) => !x.metadata?.isDraft)
    .map((x) => `/${x.url_path}`);
  const pages = await globby([
    "pages/*.(js|tsx)",
    "!pages/_*.(js|tsx)",
    "!pages/api",
    "!pages/404.(js|tsx)",
    "!pages/**/\\[\\[*\\]\\].(js|tsx)", // pages/[[...slug]].tsx
  ]);

  const siteUrl = {YOUR WEBSITE DOMAIN}

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .concat(contentPages)
        .map((page) => {
          const path = page
            .replace("pages/", "/")
            .replace("public/", "/")
            .replace(/\.js|.tsx|.mdx|.md[^\/.]+$/, "")
            .replace("/feed.xml", "");
          const route = path === "/index" ? "" : path;
          return `
            <url>
              <loc>${siteUrl}${route}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  if (siteUrl) {
    writeFileSync("public/sitemap.xml", formatted);
    console.log("Sitemap generated...");
  }
}
```

- add this to the scripts section in your package.json filename

```
"prebuild": "./scripts/sitemap.mjs",
```
