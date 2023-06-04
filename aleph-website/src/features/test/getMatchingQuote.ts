import Fuse from "fuse.js";
export const getMatchingQuote = (
  passage: string,
  quotes: { explanation: string; text: string }[]
) => {
  const lines = passage.split("\n").map((text) => ({ content: text }));

  // Options for Fuse
  let options = {
    includeScore: true,
    isCaseSensitive: false,
    includeMatches: true,
    keys: ["content"],
  };

  console.log("lines ", lines);

  // Create a new instance of Fuse
  let fuse = new Fuse(lines, options);
  let replaced = passage;

  for (const quote of quotes) {
    let result = fuse.search(quote.text);

    console.log("result ", result);

    if (result.length) {
      replaced = replaced.replace(
        result[0].item.content,
        `<b>${result[0].item.content}</b>`
      );
    }
  }

  return replaced;
};
