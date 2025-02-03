import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import pg from "pg";
import bcrypt from "bcrypt";

// instance & variables
const app = express();
const port = 3000;
const saltRounds = 12;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "YaZahraa@135",
  port: 5432,
});

db.connect();

// middlewares

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  secret: "TOPSECRETWORD",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24},
}));
app.use(passport.initialize());
app.use(passport.session());

// Get routes
app.get("/", (req, res)=>{
  res.render("home.ejs");
});

app.get("/login", (req, res)=>{
  res.render("login.ejs");
});

app.get("/register", (req, res)=>{
  res.render("register.ejs");
});

app.get("/secrets", (req, res)=>{
  if (req.isAuthenticated()){
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res)=>{
  req.logout((err)=>{
    if (err){
      return next(err);
    }
    res.redirect("/");
  })
})

// post routes

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));


app.post("/register", async (req, res)=>{
  
  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
    if (isEmailExist.rows.length < 1) {

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashedPassword]);
      const user = result.rows[0];

      req.login(user, (err)=>{
        res.redirect("/secrets");
      });

    } else {
      res.send("Email already registered, try to sign in");
    }

  } catch (err){
    res.send(err);
  }
})

passport.use(new Strategy(async function verify(username, password, cb){
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (isEmailExist.rows.length > 0) {

      const user = isEmailExist.rows[0];
      const storedHashedPassword = user.password;
      const isPassCorrect = await bcrypt.compare(password, storedHashedPassword);

      if (isPassCorrect){
        cb(null, user);
      } else {
        cb("Wrong Password", false);
      }

    } else {
      return cb("Email does not exist, try to sign in");
    }
  } catch (err){
    return cb(err);
  }
}));


passport.serializeUser(function(user, cb){
  cb(null, user.id);
})

passport.deserializeUser(async function(id, cb){
  try {

    const result = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    
    if (result.rows.length > 0){
      cb(null, result.rows[0]);
    } else {
      cb(null, false);
    }

  } catch (err){
    cb(err);
  }
})



app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});
