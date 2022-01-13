// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";

import clientPromise from "../../lib/database";

export default async function handler(request, res) {
  const client = await clientPromise;

  const database = client.db("rss_feed");
  const feeds = await database
    .collection("feed")
    .find({ _id: new ObjectId(request.query.id) })
    .toArray();
  res.json(feeds);
}
