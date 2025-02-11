// Import  packages
import express from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import pg from "pg";
import env from "dotenv";


// Initialise Enviroment variables
env.config()


// Initialise variables

const app = express();
const port = 3000;
const saltRounds = 10;
const db = new pg.Client({
  user:process.env.PG_USER,
  host:process.env.PG_HOST,
  database:process.env.PG_DATABASE,
  password:process.env.PG_PASSWORD,
  port:process.env.PG_PORT,
});

db.connect();


// Initialise MiddleWares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000* 60*60*24},
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialise Get routes

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()){
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res)=>{
  req.logout((err)=>{
    if (err) console.log(err);
    res.redirect("/login");
  });
});


app.post("/submit", async (req, res)=>{
  const user = req.user;
  const secret = req.body.secret;
  try {
    await db.query("UPDATE users SET secret = $1 WHERE email = $2;", [secret, user.email]);
    res.redirect("/secrets");
  } catch (err) {
    res.send(err);
  }
});


app.get("/secrets", (req, res)=>{
  if (req.isAuthenticated()) {
    res.render("secrets.ejs", {secret: req.user.secret});
  } else {
    res.redirect("/login");
  }
});

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/auth/google/secrets", passport.authenticate("google", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.post("/login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));



// Register post request

app.post("/register", async (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (isEmailExist.rows.length === 0){
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [username, hashPassword]);
      const user = result.rows[0];
      req.login(user, (err) => {
        if (err){
          return res.send("Error Occur, try again later", err);
        } 
        res.redirect("/secrets");
      });
    } else {
      res.send("Email already Exist, try to login");
    }
  } catch (err){
    console.log(err);
    res.send("Error Occur, try again later.")
  }
});



passport.use("local", new Strategy(async function verify(username, password, cb){

  try {
      const isEmailExist = await db.query("SELECT * FROM users WHERE LOWER(email) = $1", [username.toLowerCase()]);
      if (isEmailExist.rows.length > 0){
        const user = isEmailExist.rows[0];
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (isPassCorrect){
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      } else {
        return cb("User not found");
      }
  } catch (err){
    console.log(err);
    return cb(err);
  }
}));


passport.use("google", new GoogleStrategy({

  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",

}, async (accessToken, refreshToken, profile, cb)=>{

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
    if (isEmailExist.rows.length == 0){
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [profile.email, profile.id]);
      const user = result.rows[0];
      return cb(null, user);
    } else {
      return cb(null, isEmailExist.rows[0]);
    }

  } catch (err) {
    return cb(err);
  }

}));


passport.serializeUser((user, cb)=>{
  return cb(null, user.id);
});

passport.deserializeUser(async (id, cb)=>{

  try {
    const isIdExist = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (isIdExist.rows.length > 0){
      return cb(null, isIdExist.rows[0]);
    } else {
      return cb(null, false);
    }
  } catch (err){
    return cb(err);
  }

});


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});