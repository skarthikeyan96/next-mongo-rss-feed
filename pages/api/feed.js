// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/database";
import { getFeed } from "../../lib/rss";

export default async function handler(request, res) {
  const client = await clientPromise;

  const feedData = await getFeed(request.body.url);

  const database = client.db("rss_feed");
  const newPost = await database.collection("feed").insert(feedData);
  res.json({ status: 200, data: newPost });
}
