# @flowershow/remark-wiki-link

## 1.2.0

### Minor Changes

- 5ef0262: Don't hyphentate or lowercase src/hrefs by default. Add ignore patterns option to `getPermalinks` util function and allow passing custom paths -> permalinks converter function.

## 1.1.2

### Patch Changes

- 135a238: Small regex fix in pageResolver.

## 1.1.1

### Patch Changes

- 71110e2: Fix: wiki links to index pages.
- ffa9766: Fix wiki links to headings on the same page.

## 1.1.0

### Minor Changes

- 22fb5f0: Code refactoring and test converage extension. Also, disabling markdownFolder option in favour of exported getPermalinks function that should be used by the user to generate permalinks list and explicitly pass it to the plugin.

## 1.0.1

### Patch Changes

- ae2bf0d: Dynamic import `getFiles` function, only when `markdownFolder` is passed as an option.
