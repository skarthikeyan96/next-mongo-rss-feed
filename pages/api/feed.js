// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/database";
import { getFeed } from "../../lib/rss";

export default async function handler(request, res) {
  const client = await clientPromise;

  const database = client.db("rss_feed");

  if (request.method === "POST") {
    try {
      const feedData = await getFeed(request.body.url);
      const newFeed = await database.collection("feed").insert(feedData);
      res.json({ status: 200, data: newFeed });
    } catch (error) {
      res.sendStatus(500).json(error);
    }
  }
  if (request.method === "GET") {
    try {
      const feeds = await database.collection("feed").find({}).toArray();
      res.json(feeds);
    } catch (error) {
      res.send(error);
    }
  }
}
