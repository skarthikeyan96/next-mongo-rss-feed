// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/database";
import { getFeed } from "../../lib/rss";

export default async function handler(request, res) {
  const client = await clientPromise;

  const database = client.db("rss_feed");

  if (request.method === "POST") {
    try {
      const feedData = await getFeed(request.body.url);
      const seed = [...feedData.items];
      const data = transformSeed(seed, feedData.title);
      const newFeed = await database.collection("feeds").insertMany(data);
      res.json({ status: 200, data: newFeed });
    } catch (error) {
      res.sendStatus(500).json(error);
    }
  }
  if (request.method === "GET") {
    try {
      const feeds = await database.collection("feeds").find({}).toArray();
      res.json(feeds);
    } catch (error) {
      res.send(error);
    }
  }
}

const transformSeed = (seed, title) => {
  for (const element of seed) {
    Object.assign(element, {
      source: title,
      isoDate: new Date(element.isoDate).toDateString(),
    });
  }
  return seed;
};
