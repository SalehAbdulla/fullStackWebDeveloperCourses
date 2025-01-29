import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pg from "pg";


const app = express();
const port = 3000;
const saltRound = 12;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "YaZahraa@135",
  port: 5432,
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

  const username = req.body.username;
  const password = req.body.password;

  try {
    // check if email exist
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);

    if (isEmailExist.rows.length < 1) {

      bcrypt.hash(password, saltRound, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          await db.query("INSERT INTO USERS (email, password) VALUES ($1, $2);", [username, hash]);
          res.render("secrets.ejs");
        }
      })

    } else {
      res.send("Email already Exist");
    }

  } catch (err) {
    res.send(err);
  }

});




app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username.toLowerCase()]);

    if (isEmailExist.rows.length > 0){
      const result = await db.query("SELECT password FROM users WHERE email = $1;", [username]);
      const bcryptPassword = result.rows[0]?.password;
      const isMatch = await bcrypt.compare(password, bcryptPassword);
      console.log(isMatch);
      
      if (isMatch){
        res.render("secrets.ejs");
      } else {
        res.send("Wrong password");
      }

    } else {
      res.send("Email does not exist");
    }

  } catch(err) {
    console.err(err);
  }

});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
