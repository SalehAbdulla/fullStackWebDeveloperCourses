import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import GoogleStratrgy from "passport-google-oauth2";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";

// application initilistion
env.config();

const app = express();
const port = 3000;
const saltRounds = 10;
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24},
}));
app.use(passport.initialize());
app.use(passport.session());


// get routes
app.get("/", (req, res)=>{
  res.render("home.ejs");
});

app.get("/register", (req, res)=>{
  res.render("register.ejs");
});

app.get("/login", (req, res)=>{
  res.render("login.ejs");
});

app.get("/secrets", (req, res)=>{
  if (req.isAuthenticated()){
    res.render("/secrets.ejs", {secret: req.user.secret || ""});
  } else {
    res.redirect("/login");
  }
});

app.post("login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.post("/register", async (req, res)=>{
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [req.body.username]);

    if (isEmailExist.rows.length === 0){

      const hashedPassword = await bcypt.hash(req.body.password, saltRounds);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2);",[req.body.username.toLowerCase(), hashedPassword]);
      const user = result.rows[0];
      req.login(user, (err)=>{
        if (err) return res.send(err);
        res.redirect("/secrets");
      });
    } else {
      res.send("user already exist, try to sign in");
    }

  } catch (err){
    res.status(500).send(err);
  }
});


// local strategy

passport.use("local", new Strategy(async (username, password, cb) => {
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE LOWER(email) = $1", [username.toLowerCase()]);
    if (isEmailExist.rows.length > 0){
      const user = isEmailExist.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match){
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    } else {
      return cb("user not found");
    }
  } catch (err){
    return cb(err);
  }
}));

// serilisation

passport.serializeUser((user, cb)=>{
  return cb(null, user.id);
});

passport.deserializeUser(async (id, cb)=>{

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (isEmailExist.rows.length > 0) {
      const user = isEmailExist.rows[0];
      return cb(null, user);
    } else {
      return cb(null, false)
    }
    
  } catch (err){
    return cb(err);
  }


});


app.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`);
});