# remark-wiki-link

Parse and render wiki-style links in markdown especially Obsidian style links.

## What is this ?

Using obsidian, when we type in wiki link syntax for eg. `[[wiki_link]]` it would parse them as anchors.

## Features supported

- [x] Support `[[Internal link]]`
- [x] Support `[[Internal link|With custom text]]`
- [x] Support `[[Internal link#heading]]`
- [x] Support `[[Internal link#heading|With custom text]]`
- [x] Support `![[Document.pdf]]`
- [x] Support `![[Image.png]]`

* Supported image formats are jpg, jpeg, png, apng, webp, gif, svg, bmp, ico
* Unsupported image formats will display a raw wiki link string, e.g. `[[Image.xyz]]`.

Future support:

- [ ] Support `![[Audio.mp3]]`
- [ ] Support `![[Video.mp4]]`
- [ ] Support `![[Embed note]]`
- [ ] Support `![[Embed note#heading]]`

## Installation

```bash
npm install @flowershow/remark-wiki-link
```

## Usage

```javascript
import unified from "unified";
import markdown from "remark-parse";
import wikiLinkPlugin from "@flowershow/remark-wiki-link";

const processor = unified().use(markdown).use(wikiLinkPlugin);
```

## Configuration options

### `pathFormat`

Type: `"raw" | "obisidan-absolute" | "obsidian-short"`
Default: `"raw"`

- `"raw"`: use this option for regular relative or absolute paths (or Obsidian relative paths), e.g. `[[../some/folder/file]]` or `[[[/some/folder/file]]]`,
- `"obsidian-absolute"`: use this option for Obsidian absolute paths, i.e. paths with no leading `/`, e.g. `[[some/folder/file]]`
- `"obsidian-short"`: use this option for Obsidian shortened paths, e.g. `[[file]]` to resolve them to absolute paths. Note that apart from setting this value, you will also need to pass a list of paths to files in your content folder, and pass it as `permalinks` option. You can generate this list yourself or use our util function `getPermalinks`. See below for more info.

> [!note]
> Wiki link format in Obsidian can be configured in Settings -> Files & Links -> New link format.

### `aliasDivider`

Type: single character string
Default: `"|"`

Alias divider character used in your wiki links. E.g. `[[/some/folder/file|Alias]]`

### `permalinks`

Type: `Array<string>`
Default: `[]`

A list of permalinks you want to match your wiki link paths with. Wiki links with matched permalinks will have `node.data.exists` property set to `true`. Wiki links with no matching permalinks will also have additional class `new` set.

### `wikiLinkResolver`

Type: `(name: string) => Array<string>`
Default: `(name: string) => name.replace(/\/index$/, "")` (simplified; see source code for full version)

A function that will take the wiki link target page (e.g. `"/some/folder/file"` in `[[/some/folder/file#Some Heading|Some Alias]]` wiki link) and return an array of pages to which the wiki link **can** be resolved (one of them will be used, depending on wheather `pemalinks` are passed, and if match is found).

If `permalinks` are passed, the resulting array will be matched against these permalinks to find the match. The matching pemalink will be used as node's `href` (or `src` for images).

If no matching permalink is found, the first item from the array returned by this function will be used as a node's `href` (or `src` for images). So, if you want to write a custom wiki link -> url

### `newClassName`

Type: `string`
Default: `"new"`

Class name added to nodes created for wiki links for which no matching permalink (passed in `permalinks` option) was found.

### `wikiLinkClassName`

Type: `string`
Default: `"internal"`

Class name added to all wiki link nodes.

### `hrefTemplate`

Type: `(permalink: string) => string`
Default: `(permalink: string) => permalink`

A function that will be used to convert a matched permalink of the wiki link to `href` (or `src` for images).

### `markdownFolder` ❌ (deprecated as of version 1.1.0)

A string that points to the content folder, that will be used to resolve Obsidian shortened wiki link path format.

Instead of using this option, use e.g. `getPermalinks` util function exported from this package to generate a list of permalinks from your content folder, and pass it explicitly as `permalinks` option.

## Generating list of permalinks from content folder with `getPermalinks`

If you're using shortened path format for your Obsidian wiki links, in order to resolve them correctly to paths they point to, you need to set `option.pathFormat: "obsidian-short"` but also provide the plugin with a list of permalinks that point to files in your content folder as `option.permalinks`. You can use your own script to generate this list or use our util function `getPermalinks` like so:

```javascript {4,6,11-12}
import unified from "unified";
import markdown from "remark-parse";
import wikiLinkPlugin from "@flowershow/remark-wiki-link";
import { getPermalinks } from "@flowershow/remark-wiki-link";

const permalinks = await getPermalinks("path-to-your-content-folder");

const processor = unified().use(markdown).use(wikiLinkPlugin, {
  pathFormat: "obsidian-short",
  permalinks,
});
```

## Running tests

```bash
pnpm nx test remark-wiki-link
```
