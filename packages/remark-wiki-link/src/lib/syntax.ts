// Adjusted copy of https://github.com/landakram/micromark-extension-wiki-link/blob/master/src/index.js
import { codes } from "micromark-util-symbol/codes.js";

export interface SyntaxOptions {
  aliasDivider?: string;
}

function isEndOfLineOrFile(code: number) {
  return (
    code === codes.carriageReturnLineFeed ||
    code === codes.carriageReturn ||
    code === codes.lineFeed ||
    code === codes.eof
  );
}

/**
 * Token types:
 * - `wikiLink`:
 * - `wikiLinkMarker`: The opening and closing brackets
 * - `wikiLinkData`: The data between the brackets
 * - `wikiLinkTarget`: The target of the link (the part before the alias divider)
 * - `wikiLinkAliasMarker`: The alias divider
 * - `wikiLinkAlias`: The alias of the link (the part after the alias divider)
 * */

function wikiLink(opts: SyntaxOptions = {}) {
  const aliasDivider = opts.aliasDivider || "|";

  const aliasMarker = aliasDivider.charCodeAt(0);
  const startMarker = codes.leftSquareBracket;
  const embedStartMarker = codes.exclamationMark;
  const endMarker = codes.rightSquareBracket;

  function tokenize(effects, ok, nok) {
    let data = false;
    let alias = false;

    let startMarkerCount = 0;
    let endMarkerCount = 0;

    return start;

    // recognize the start of a wiki link
    function start(code: number) {
      if (code === startMarker) {
        effects.enter("wikiLink");
        effects.enter("wikiLinkMarker");

        return consumeStart(code);
      } else if (code === embedStartMarker) {
        effects.enter("wikiLink", { isType: "embed" });
        effects.enter("wikiLinkMarker", { isType: "embed" });

        return consumeStart(code);
      } else {
        return nok(code);
      }
    }
    function consumeStart(code: number) {
      // when coursor is at the first character after the start marker `[[`
      if (startMarkerCount === 2) {
        effects.exit("wikiLinkMarker");
        return consumeData(code);
      }

      if (code === startMarker || code === embedStartMarker) {
        if (code === startMarker) {
          startMarkerCount++;
        }
        effects.consume(code);
        return consumeStart;
      } else {
        return nok(code);
      }
    }

    function consumeData(code: number) {
      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }

      effects.enter("wikiLinkData");
      effects.enter("wikiLinkTarget");
      return consumeTarget(code);
    }

    function consumeTarget(code: number) {
      if (code === aliasMarker) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.enter("wikiLinkAliasMarker");
        return consumeAliasMarker(code);
      }

      if (code === endMarker) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }

      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }

      data = true;
      effects.consume(code);

      return consumeTarget;
    }

    function consumeAliasMarker(code) {
      effects.consume(code);
      effects.exit("wikiLinkAliasMarker");
      effects.enter("wikiLinkAlias");
      return consumeAlias(code);
    }

    function consumeAlias(code: number) {
      if (code === endMarker) {
        if (!alias) return nok(code);
        effects.exit("wikiLinkAlias");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }

      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }

      alias = true;
      effects.consume(code);

      return consumeAlias;
    }

    function consumeEnd(code: number) {
      if (endMarkerCount === 2) {
        effects.exit("wikiLinkMarker");
        effects.exit("wikiLink");
        return ok(code);
      }

      if (code !== endMarker) {
        return nok(code);
      }

      effects.consume(code);
      endMarkerCount++;

      return consumeEnd;
    }
  }

  const wikiLinkConstruct = { tokenize };

  return {
    text: {
      [codes.leftSquareBracket]: wikiLinkConstruct,
      [codes.exclamationMark]: wikiLinkConstruct,
    },
  };
}

export { wikiLink as syntax };
