import * as path from "path";
import { getPermalinks } from "../src/utils";

const markdownFolder = path.join(
  ".",
  "test/fixtures/content"
);

describe("getPermalinks", () => {
  test("should return an array of permalinks", () => {
    const expectedPermalinks = [
      "/README",
      "/abc",
      "/blog/first-post",
      "/blog/Second Post",
      "/blog/third-post",
      "/blog/README",
      "/blog/tutorials/first-tutorial",
      "/assets/Pasted Image 123.png",
    ];

    const permalinks = getPermalinks(markdownFolder, [/\.DS_Store/]);
    expect(permalinks).toHaveLength(expectedPermalinks.length);
    permalinks.forEach((permalink) => {
      expect(expectedPermalinks).toContain(permalink);
    });
  });
});
