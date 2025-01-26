import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "YaZahraa@135",
  port: 5432,
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

async function getItems(){
  const data = await db.query("SELECT * FROM items");
  const result = data.rows;
  console.log(result);
  return result;
}

getItems();

app.post("/edit", async (req, res) => {
  const result = await getItems();
  res.render("index.ejs", {listItems: result});
});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
