import { MarkdownDB } from "@flowershow/markdowndb";

const dbPath = "markdown.db";

const client = new MarkdownDB({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
});

const clientPromise = client.init();

export default clientPromise;
