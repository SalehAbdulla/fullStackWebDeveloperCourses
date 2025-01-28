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
  port: "5432",
})

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
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2);", [email, password]);
    res.redirect("/");
  } catch (err){
    res.send("Error occure in registration");
  }

});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {

      await db.query("SELECT * FROM users WHERE email = $1;", [email]);
      try {
        const foundPassword = await db.query("SELECT password FROM users WHERE email = $1", [email]);
          if (password == foundPassword.rows[0]?.password){
            res.render("secrets.ejs");
          } else {
            res.send("Wrong password");
          }
      } catch (err) {
        res.send("Error occure while sign in password");
      }
  } catch(err){
    res.send("Email not found");
  }


});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
