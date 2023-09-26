import { visit } from "unist-util-visit";

// https://youtu.be/vDuh7vDgGIg

// TODO write tests!
function transformer(tree) {
  visit(tree, "paragraph", (node) => {
    visit(node, "text", (textNode) => {
      if (
        (textNode.value.includes("https://www.youtube.com") ||
          textNode.value.includes("https://youtu.be")
        ) &&
        !textNode.value.includes("\n")
      ) {
        let videoId: string;

        if (textNode.value.includes("https://youtu.be")) {
          // Extract video ID for short YT URLs
          videoId = textNode.value.split("/").pop();
        } else {
          // Extract video ID for full YT URLs
          const urlSplit = textNode.value.split(/[=&]+/);
          videoId = urlSplit[1];
        }

        const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
        Object.assign(node, {
          ...node,
          type: "element",
          data: {
            hProperties: {
              style: "position:relative;padding-bottom:56.25%",
            },
          },
          children: [
            {
              ...textNode,
              type: "element",
              tagName: "iframe",
              data: {
                hName: "iframe",
                hProperties: {
                  style:
                    "position:absolute;top:0;left:0;width:100%;height:100%",
                  src: iframeUrl,
                  allowfullscreen: true,
                  frameborder: "0",
                  allow:
                    "accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture",
                },
              },
            },
          ],
        });
      }
    });
  });
}

function attacher() {
  return transformer;
}

export default attacher;
