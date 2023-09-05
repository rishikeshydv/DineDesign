import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise)
})