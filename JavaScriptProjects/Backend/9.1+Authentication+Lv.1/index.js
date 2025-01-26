import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "YaZahraa@135",
  port: 5432,
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  const email = req.body.username;
  const password = req.body.password;

  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    res.redirect("/");
  } catch (err){
    console.error(err);
  }

});

app.post("/login", async (req, res) => {
  
  const email = req.body.username;
  const password = req.body.password;

  try {
      const queryEmail = await db.query("SELECT email FROM users WHERE LOWER(email) = $1;", [email.toLowerCase()]);
      const queryPassword = await db.query("SELECT password FROM users WHERE password = $1;", [password]);

      const foundEmail = queryEmail.rows[0]?.email;
      const foundPassword = queryPassword.rows[0]?.password

      if (email == foundEmail && password == foundPassword) {
        res.render("secrets.ejs");
      } else {
        res.redirect("/login");
      }

  } catch (err){
    console.error(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
