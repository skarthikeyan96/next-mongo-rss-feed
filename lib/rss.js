import Parser from "rss-parser";

export async function getFeed(feedUrl) {
  const parser = new Parser();

  return await parser.parseURL(feedUrl);
}
