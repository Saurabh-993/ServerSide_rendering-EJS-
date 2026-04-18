import express from "express";
import connect from "./connectiondb.js";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { type } from "os";
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

const cardschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Cards = mongoose.model("card", cardschema);

app.get("/", (req, res) => {
  res.render("index"); //you can also write index.ejs but our view engine already know what to find inside the views
});

app.get("/cards", async (req, res) => {
  const cards = await Cards.find({});
  res.render("cards", { cards });
});

app.get("/cards/:id/edit", async (req, res) => {
  const card = await Cards.findOne({ _id: req.params.id });
  res.render("edit", { card });
});

app.post("/cards/:id/edit", async (req, res) => {
  const { name, image, email } = req.body;
  await Cards.updateOne({ name: name, email: email, image: image });
  res.redirect("/cards");
});

app.get("/cards/:id", async (req, res) => {
  const idofcard = req.params.id;
  await Cards.deleteOne({ _id: idofcard });
  res.redirect("/cards");
});

app.get("/creation", (req, res) => {
  res.render("creation");
});

app.post("/creation", async (req, res) => {
  //we can also create a seprate route page for the form submission to make it look clean but here we are just using the same page.
  const { name, email, image } = req.body;
  const user = new Cards({
    name,
    email,
    image,
  });
  await user.save();
  res.redirect("/cards");
});

app.listen(PORT, () => console.log("The Server is ready!"));
