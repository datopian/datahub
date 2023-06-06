import * as path from "path";
// import * as url from "url";
import { getPermalinks } from "../src/utils";

// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const markdownFolder = path.join(__dirname, "/fixtures/content");
const markdownFolder = path.join(
  ".",
  "/packages/remark-wiki-link/test/fixtures/content"
);

describe("getPermalinks", () => {
  test("should return an array of permalinks", () => {
    const expectedPermalinks = [
      "/", // /index.md
      "/abc",
      "/blog/first-post",
      "/blog/Second Post",
      "/blog/third-post",
      "/blog", // /blog/index.md
      "/blog/tutorials/first-tutorial",
      "/assets/Pasted Image 123.png",
    ];

    const permalinks = getPermalinks(markdownFolder, [/\.DS_Store/]);
    expect(permalinks).toHaveLength(expectedPermalinks.length);
    permalinks.forEach((permalink) => {
      expect(expectedPermalinks).toContain(permalink);
    });
  });

  test("should return an array of permalinks with custom path -> permalink converter function", () => {
    const expectedPermalinks = [
      "/", // /index.md
      "/abc",
      "/blog/first-post",
      "/blog/second-post",
      "/blog/third-post",
      "/blog", // /blog/index.md
      "/blog/tutorials/first-tutorial",
      "/assets/pasted-image-123.png",
    ];

    const func = (filePath: string, markdownFolder: string) => {
      const permalink = filePath
        .replace(markdownFolder, "") // make the permalink relative to the markdown folder
        .replace(/\.(mdx|md)/, "")
        .replace(/\\/g, "/") // replace windows backslash with forward slash
        .replace(/\/index$/, "") // remove index from the end of the permalink
        .replace(/ /g, "-") // replace spaces with hyphens
        .toLowerCase(); // convert to lowercase

      return permalink.length > 0 ? permalink : "/"; // for home page
    };

    const permalinks = getPermalinks(markdownFolder, [/\.DS_Store/], func);
    expect(permalinks).toHaveLength(expectedPermalinks.length);
    permalinks.forEach((permalink) => {
      expect(expectedPermalinks).toContain(permalink);
    });
  });
});
