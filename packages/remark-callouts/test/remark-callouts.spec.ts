import { expect } from "chai";
import { parseDocument } from "htmlparser2";
import { selectOne } from "css-select";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { callouts, Config } from "../src";

async function mdToHtml(md: string, options?: Partial<Config>) {
  return String(
    await remark()
      .use(remarkParse)
      .use(callouts, options)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(md)
  );
}

describe("remark callouts", function () {
  it("parses a blockquote without a callout", async function () {
    const html = await mdToHtml(`\
> no callout
`);
    const doc = parseDocument(html);
    const blockquote = selectOne("div > blockquote.blockquote > p", doc);
    expect(blockquote).to.have.nested.property("firstChild.data", "no callout");
  });

  it("parses a blockquote callout with title and content", async function () {
    const html = await mdToHtml(`\
> [!tip]
> example content here
    `);
    const doc = parseDocument(html);
    const calloutTitle = selectOne(
      "div > blockquote.callout > div.callout-title.tip > strong",
      doc
    );
    const calloutContent = selectOne(
      "div > blockquote.callout > div.callout-content > p",
      doc
    );

    expect(calloutTitle).to.have.nested.property("firstChild.data", "Tip");
    expect(calloutContent).to.have.nested.property(
      "firstChild.data",
      "example content here"
    );
  });

  it("parses a blockquote callout with case insensitive keyword", async function () {
    const html = await mdToHtml(`\
> [!INFO]
    `);
    const doc = parseDocument(html);
    const calloutTitle = selectOne(
      "div > blockquote.callout > div.callout-title.info > strong",
      doc
    );

    expect(calloutTitle).to.have.nested.property("firstChild.data", "Info");
  });

  it("parses a blockquote callout with an icon", async function () {
    const html = await mdToHtml(`\
> [!tip]
> example content here
    `);
    const doc = parseDocument(html);
    const calloutIcon = selectOne(
      "div > blockquote.callout > div.callout-title.tip > span.callout-icon > svg",
      doc
    );

    expect(calloutIcon).to.exist;
  });

  it("parses a blockquote callout with a custom title", async function () {
    const html = await mdToHtml(`\
> [!tip] Custom Title
> content
    `);
    const doc = parseDocument(html);
    const calloutTitle = selectOne(
      "div > blockquote.callout > div.callout-title.tip > strong > p",
      doc
    );

    expect(calloutTitle).to.have.nested.property(
      "firstChild.data",
      "Custom Title"
    );
  });

  it("parses a blockquote callout with unknown type to use note", async function () {
    const html = await mdToHtml(`\
> [!xyz]
> content
    `);
    const doc = parseDocument(html);
    const calloutTitle = selectOne(
      "div > blockquote.callout > div.callout-title.note > strong",
      doc
    );

    expect(calloutTitle).to.have.nested.property("firstChild.data", "Xyz");
  });

  it("parses a blockquote callout with unknown type and custom title", async function () {
    const html = await mdToHtml(`\
> [!xyz] Some title
> content
    `);
    const doc = parseDocument(html);
    const calloutTitle = selectOne(
      "div > blockquote.callout > div.callout-title.note > strong > p",
      doc
    );

    expect(calloutTitle).to.have.nested.property(
      "firstChild.data",
      "Some title"
    );
  });

  it("parses a nested blockquote with callout", async function () {
    const html = await mdToHtml(`\
> [!note]
> content
> > [!info]
> > nested callout
    `);
    const doc = parseDocument(html);
    const nestedCallout = selectOne(
      "div > blockquote.callout > div.callout-content > div > blockquote.callout > div.callout-title > strong",
      doc
    );

    expect(nestedCallout).to.have.nested.property("firstChild.data", "Info");
  });
});
