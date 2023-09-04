import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "@/lib/mongodb";
import dataModel from "@/models/user";
import { hash } from "bcryptjs";
import mongoose, { Mongoose } from "mongoose";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();
    if (req.method === "POST") {
      if (!req.body) return res.status(400).json({ error: "Data Missing" });
      const { username, password, name, email } = req.body;
      const userExists = await dataModel.findOne({ username });
      if (userExists)
        return res.status(409).json({ error: "User already exists" });
      else {
        try {
          const saltRounds = 10;
          const hashedPassword = await hash(password, saltRounds);
          dataModel.create({
            username,
            password: hashedPassword,
            name,
            email,
          });
          res.status(201).json({ message: "User successfully created" });
        } catch (error) {
          return res.status(500).json({ error: "Failed to Create User" });
        }
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    res.json(error);
  } finally {
    mongoose.connection.close();
  }
};
export default handler;
