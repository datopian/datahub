import { syntax } from "../src/lib/syntax";
import { html } from "../src/lib/html";
import { micromark } from "micromark";

describe("micromark-extension-wiki-link", () => {
  describe("parses a wikilink", () => {
    test("with 'raw' file format (default) that has no matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      // note: class="internal new"
      expect(serialized).toBe(
        '<p><a href="Wiki Link" class="internal new">Wiki Link</a></p>'
      );
    });

    test("with 'raw' file format (default) that has a matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["Wiki Link"] })],
      });
      // note: class="internal"
      expect(serialized).toBe(
        '<p><a href="Wiki Link" class="internal">Wiki Link</a></p>'
      );
    });

    test("with shortened Obsidian-style path that has no matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            pathFormat: "obsidian-short",
          }),
        ],
      });
      // note: class="internal new"
      expect(serialized).toBe(
        '<p><a href="Wiki Link" class="internal new">Wiki Link</a></p>'
      );
    });

    test("with shortened Obsidian-style path that has a matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            permalinks: ["/some/folder/Wiki Link"],
            pathFormat: "obsidian-short",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/Wiki Link" class="internal">Wiki Link</a></p>'
      );
    });

    // Obsidian absolute path doesn't have a leading slash
    test("with 'obsidian-absolute' path format that has no matching permalink", () => {
      const serialized = micromark("[[some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pathFormat: "obsidian-absolute" })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/Wiki Link" class="internal new">some/folder/Wiki Link</a></p>'
      );
    });

    // Obsidian absolute path doesn't have a leading slash
    test("with 'obsidian-absolute' path format that has a matching permalink", () => {
      const serialized = micromark("[[some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            permalinks: ["/some/folder/Wiki Link"],
            pathFormat: "obsidian-absolute",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/Wiki Link" class="internal">some/folder/Wiki Link</a></p>'
      );
    });
  });

  describe("aliases and headings", () => {
    test("parses a wiki link with heading", () => {
      const serialized = micromark("[[Wiki Link#Some Heading]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      // note: lowercased and hyphenated heading
      expect(serialized).toBe(
        '<p><a href="Wiki Link#some-heading" class="internal new">Wiki Link#Some Heading</a></p>'
      );
    });

    test("parses a wiki link with heading and alias", () => {
      const serialized = micromark("[[Wiki Link#Some Heading|Alias]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      // note: lowercased and hyphenated heading
      expect(serialized).toBe(
        '<p><a href="Wiki Link#some-heading" class="internal new">Alias</a></p>'
      );
    });

    test("parses a wiki link to a heading on the same page", () => {
      const serialized = micromark("[[#Some Heading]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="#some-heading" class="internal new">Some Heading</a></p>'
      );
    });
  });

  describe("image embeds", () => {
    test("parses an image embed of supported file format", () => {
      const serialized = micromark("![[My Image.jpg]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><img src="My Image.jpg" alt="My Image.jpg" class="internal new" /></p>'
      );
    });

    test("parses an image embed of unsupported file format", () => {
      const serialized = micromark("![[My Image.xyz]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>![[My Image.xyz]]</p>");
    });

    test("parses and image ambed with a matching permalink", () => {
      const serialized = micromark("![[My Image.jpg]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["My Image.jpg"] })],
      });
      expect(serialized).toBe(
        '<p><img src="My Image.jpg" alt="My Image.jpg" class="internal" /></p>'
      );
    });

    test("parses an image embed with a matching permalink and Obsidian-style shortedned path", () => {
      const serialized = micromark("![[My Image.jpg]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            permalinks: ["/assets/My Image.jpg"],
            pathFormat: "obsidian-short",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><img src="/assets/My Image.jpg" alt="My Image.jpg" class="internal" /></p>'
      );
    });

    test("parses an image embed with an alt text", () => {
      const serialized = micromark("![[My Image.jpg|My Image Alt]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><img src="My Image.jpg" alt="My Image Alt" class="internal new" /></p>'
      );
    });

    test("parses a pdf embed", () => {
      const serialized = micromark("![[My Document.pdf]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><iframe width="100%" src="My Document.pdf#toolbar=0" class="internal new" /></p>'
      );
    });
  });

  describe("invalid wiki links", () => {
    test("doesn't parse a wiki link with two missing closing brackets", () => {
      const serialized = micromark("[[Wiki Link", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[[Wiki Link</p>");
    });

    test("doesn't parse a wiki link with one missing closing bracket", () => {
      const serialized = micromark("[[Wiki Link]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[[Wiki Link]</p>");
    });

    test("doesn't parse a wiki link with a missing opening bracket", () => {
      const serialized = micromark("[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[Wiki Link]]</p>");
    });

    test("doesn't parse a wiki link in single brackets", () => {
      const serialized = micromark("[Wiki Link]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[Wiki Link]</p>");
    });
  });

  describe("other options", () => {
    test("parses a wiki link with a custom class", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            newClassName: "test-new",
            wikiLinkClassName: "test-wiki-link",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="Wiki Link" class="test-wiki-link test-new">Wiki Link</a></p>'
      );
    });

    test("parses a wiki link with a custom divider", () => {
      const serialized = micromark("[[Wiki Link:Alias Name]]", {
        extensions: [syntax({ aliasDivider: ":" })],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="Wiki Link" class="internal new">Alias Name</a></p>'
      );
    });

    test("parses a wiki link with a custom page resolver", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            wikiLinkResolver: (page) => [
              page.replace(/\s+/, "-").toLowerCase(),
            ],
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="internal new">Wiki Link</a></p>'
      );
    });
  });

  test("parses wiki links to index files", () => {
    const serialized = micromark("[[/some/folder/index]]", {
      extensions: [syntax()],
      htmlExtensions: [html()],
    });
    expect(serialized).toBe(
      '<p><a href="/some/folder" class="internal new">/some/folder/index</a></p>'
    );
  });

  describe("other", () => {
    test("parses a wiki link to some index page in a folder with no matching permalink", () => {
      const serialized = micromark("[[/some/folder/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder" class="internal new">/some/folder/index</a></p>'
      );
    });

    test("parses a wiki link to some index page in a folder with a matching permalink", () => {
      const serialized = micromark("[[/some/folder/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["/some/folder"] })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder" class="internal">/some/folder/index</a></p>'
      );
    });

    test("parses a wiki link to home index page with no matching permalink", () => {
      const serialized = micromark("[[/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="/" class="internal new">/index</a></p>'
      );
    });

    test("parses a wiki link to home index page with a matching permalink", () => {
      const serialized = micromark("[[/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["/"] })],
      });
      expect(serialized).toBe('<p><a href="/" class="internal">/index</a></p>');
    });
  });
});
