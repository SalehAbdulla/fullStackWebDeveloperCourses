import express from "express";
import applyMiddlewares from "./configuration/middleware.js";
import env from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";


env.config();

const app = express();
const port = 3000;
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// -----------  MiddleWare  ----------------

applyMiddlewares(app);

// -----------  Get Routes  ----------------

app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.get("/login", (req, res) => {
  res.render("login.ejs");
});


app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

// -----------  post Routes  ----------------

app.post("/register", async (req, res) => {
  try {

    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [req.body.username]);
    
    if (isEmailExist.rows.length == 0) {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;",
        [req.body.username, hashedPassword]);

      const user = result.rows[0];

      req.login(user, (err) => {
        if (err) return res.send(err);
        res.redirect("/secrets");
      })

    } else {
      res.send("Email is already exist, please sign in");
    }

  } catch (err) {
    res.send(err);
  }
});


// -----------  Strategies  ----------------


passport.use("local", new Strategy(async function verify(username, password){

  




}));



// -----------  Serialisation  ----------------

passport.serializeUser((user, cb) => {
  return cb(null, user)
});



passport.deserializeUser((user, cb) => {
  return cb(null, user);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});