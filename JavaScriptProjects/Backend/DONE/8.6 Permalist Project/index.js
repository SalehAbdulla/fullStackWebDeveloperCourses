import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: ,
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function getItems(){
  const data = await db.query("SELECT * FROM items ORDER BY title ASC");
  const result = [];
  data.rows.forEach((item)=>{
    result.push(item);
  })
  console.log(result);
  return result;
}

app.get("/", async (req, res) => {
  const items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1); ", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const userIdchoose = req.body.updatedItemId;
  const userNewTitle = req.body.updatedItemTitle;

  await db.query("UPDATE items SET title = $1 WHERE id = $2;", [ userNewTitle, userIdchoose]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const userIdchoose = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1;", [userIdchoose]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
