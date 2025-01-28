import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

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
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if email not exist first
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");

      // Password Hashing
    } else {

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error Hashing password");
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          console.log(result);
          res.render("secrets.ejs");
        }
      });
    }

  } catch (err) {
    console.log(err);
  }

});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {

    const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);

    if (result.rows.length > 0) {
      const userHashedPass = result.rows[0]?.password;

      bcrypt.compare(password, userHashedPass, (err, result) => {
        if (err) {
          console.error("Error comparing passwords");
        }

        if (result) {
          res.render("secrets.ejs");
        } else {
          res.send("Incorrect Password");
        }

      })
    }

  } catch (err) {
    res.send("Email not exist, try to register");
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
