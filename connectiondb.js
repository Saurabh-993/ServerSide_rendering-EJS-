import mongoose from "mongoose";

export default async function connect() {
  await mongoose.connect("mongodb://localhost:27017/APIreader");
  console.log("The connection to the database is stablished");
}
