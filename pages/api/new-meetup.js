// api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const meetup = req.body;
    // const { title, image, address, description } = req.body;
    const mongodb_connection_string =
      "mongodb+srv://meetups_user:meetups_password@meetups.vpwrw.mongodb.net/?retryWrites=true&w=majority&appName=meetups";
    const client = await MongoClient.connect(mongodb_connection_string);
    const db = client.db("meetups");
    const clction = db.collection("meetups");
    const result = await clction.insertOne(meetup);
    client.close();
    res.status(201).json({ message: "Meetup added." });
  }
};

export default handler;
