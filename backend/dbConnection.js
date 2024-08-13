// lib/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to the .env.local file");
}

let cachedClient = global.mongo;

if (!cachedClient) {
  cachedClient = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cachedClient.conn) {
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedClient.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cachedClient.conn = await cachedClient.promise;
  return cachedClient.conn;
}

export default dbConnect;
