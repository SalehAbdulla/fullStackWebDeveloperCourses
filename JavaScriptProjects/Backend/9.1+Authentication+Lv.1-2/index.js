import express from "express";
import bcrypt from "bcrypt";
import pg from "pg";
import session from "express-session";
import { Strategy } from "passport-local";
import passport from "passport";

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

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "TOPSECRETWORD",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use(passport.initialize());
app.use(passport.session());

// Get routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res)=>{
  res.render("login.ejs");
});

// Bypass login if has an active cookies
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.render("login.ejs");
  }
})

// post routes
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // check if email exist
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
    if (isEmailExist.rows.length < 1) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashedPassword]);
      const user = result.rows[0];
      req.login(user, (err) => {
        if (err) {
          res.send(err);
        } else {
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

passport.use(new Strategy(async function verify(username, password, cb){

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);

    if (isEmailExist.rows.length > 0){
      const user = isEmailExist.rows[0];
      const hashedPassword = user.password;
      const isPassCorrect = await bcrypt.compare(password, hashedPassword);
      if (isPassCorrect) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    } else {
      cb("Email does not exist");
    }
  } catch (err){
    return cb(err);
  }

}));

// serialization
passport.serializeUser(function(user, cb){
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb){
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0){
      const user = result.rows[0];
      cb(null, user);
    } else {
      cb(null, false);
    }
  } catch (err){
    cb(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});