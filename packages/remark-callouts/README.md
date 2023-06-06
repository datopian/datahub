# remark-callouts

Remark plugin to add support for blockquote-based callouts/admonitions similar to the approach of [Obsidian](https://help.obsidian.md/How+to/Use+callouts) and [Microsoft Learn](https://learn.microsoft.com/en-us/contribute/markdown-reference#alerts-note-tip-important-caution-warning) style.

Using this plugin, markdown like this:

```md
> [!tip]
> hello callout
```

Would render as a callout like this:

<img width="645" alt="Tip callout block" src="https://user-images.githubusercontent.com/42637597/193016397-49a90b44-cf3d-4eeb-9ad6-c0c1e374ed27.png">

## Features supported

- [x] Supports blockquote style callouts
- [x] Supports nested blockquote callouts
- [x] Supports 13 types out of the box (with appropriate styling in default theme) - see list below
- [x] Supports aliases for types
- [x] Defaults to note callout for all other types eg. `> [!xyz]`
- [x] Supports dark and light mode styles

Future support:

- [ ] Support custom types and icons
- [ ] Support custom aliases
- [ ] Support Foldable callouts
- [ ] Support custom styles

## Geting Started

### Installation

```bash
npm install remark-callouts
```

### Usage

```js
import callouts from "remark-callouts";

await remark()
  .use(remarkParse)
  .use(callouts)
  .use(remarkRehype)
  .use(rehypeStringify).process(`\
> [!tip]
> hello callout
`);
```

HTML output

```js
<div>
  <blockquote class="callout">
    <div class="callout-title tip">
      <span class="callout-icon">
        <svg>...</svg>
      </span>
      <strong>Tip</strong>
    </div>
    <div class="callout-content">
      <p>hello callout</p>
    </div>
  </blockquote>
</div>
```

Import the styles in your .css file

```css
@import "remark-callouts/styles.css";
```

or in your app.js

```js
import "remark-callouts/styles.css";
```

### Supported Callout Types

- note
- tip `aliases: hint, important`
- warning `alises: caution, attention`
- abstract `aliases: summary, tldr`
- info
- todo
- success `aliases: check, done`
- question `aliases: help, faq`
- failure `aliases: fail, missing`
- danger `alias: error`
- bug
- example
- quote `alias: cite`

# Change Log

## [2.0.0] - 2022-11-21

### Added

- Classname for icon.

### Changed

- Extract css styles which can be imported separately.

## [1.0.2] - 2022-11-03

### Fixed

- Case insensitive match for types.

## License

MIT
