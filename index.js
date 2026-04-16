import express from "express";
import connect from "./connectiondb.js";
import mongoose from "mongoose";
const PORT = 3000;
connect();
const app = express();
app.get("/", (req, res) => {
  res.send("hey dude this is home page");
});

const schema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  objectid: mongoose.Schema.ObjectId,
});

const User = mongoose.model("userinformation", schema);

const reader = await User.find({});

// console.log(reader);

app.get("/list", (req, res) => {
  res.send(
    `
  <h3>These are the elements</h3>
  <ul>
    ${reader.map((obj) => `<li>${obj.email}</li>`).join("")}
  </ul>
`,
  );
});

app.listen(PORT, () => console.log("The Server is ready!"));
