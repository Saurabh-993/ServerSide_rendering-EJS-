import express from "express";
import connect from "./connectiondb.js";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const PORT = 3000;
connect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------------------------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

//--------------------note the above line are used only in new javascript type:module if you are using type:commonjs than you can directly write the last line------

app.set("view engine", "ejs"); //It is used to set any global enviornment.

app.get("/", (req, res) => {
  res.render("index"); //you can also write index.ejs but our view engine already know what to find inside the views
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
