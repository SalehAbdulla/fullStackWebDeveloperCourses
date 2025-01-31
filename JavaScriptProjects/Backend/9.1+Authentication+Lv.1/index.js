import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRound = 12;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "YaZahraa@135",
  port: 5432,
});

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/login", (req, res) => {
  res.render("login.ejs");
})

app.get("/register", (req, res) => {
  res.render("register.ejs");
})

// must sign in first to get into the page
app.get("/secrets", (req, res) => {
  res.render("login.ejs");
})

app.post("/register", async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (isEmailExist.rows.length < 0) {
      const hashPassword = bcrypt.hash(password, saltRound);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashPassword]);
      console.error(err);
    } else {
      res.send("Email already exist, try to sign in");
    }
  } catch (err) {
    console.error(err);
  }

})

app.post("/login", async (req, res)=>{
  
})




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})