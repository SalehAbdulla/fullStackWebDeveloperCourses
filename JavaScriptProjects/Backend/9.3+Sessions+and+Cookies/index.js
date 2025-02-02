import express from "express";
import session from "express-session";
import passport from "passport";
import pg from "pg";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import { Strategy } from "passport-local";

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

// middleware

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  secret: "TopSecretWord",
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

app.get("/logout", (req, res)=>{
  req.logout((err)=>{
    if (err){
      res.send(err);
    } 
    res.redirect("/");
  })
});


app.get("/secrets", (req, res)=>{
  if (req.isAuthenticated()){
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

// post routes
app.post("/register", async (req, res)=>{
  
  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);

    if (isEmailExist.rows.length < 1) {
      const hashPassword = await bcrypt.hash(password, saltRound);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashPassword]);
      const user = result.rows[0];

      req.login(user, (err)=>{
        if (err) {
          res.send(err);
        } else {
          res.render("secrets.ejs");
        }
      })
    } else {
      res.send("Email Already Exist");
    }
  } catch (err){
    res.send(err);
    console.error(err);
  }
});

app.post("/login", passport.authenticate("local",{
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));



passport.use(new Strategy(async function verify(username, password, cb){
  
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
   
    if (isEmailExist.rows.length > 0){
      const user = isEmailExist.rows[0];
      const hashPassword = user.password;
      const isPassCorrect = await bcrypt.compare(password, hashPassword);
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

// serailisation

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(async function(id, done){

  try { 
    const result = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    if (result.rows.length > 0){
      const user = result.rows[0];
      done(null, user);
    } else {
      done(null);
    }
  } catch (err){
    done(err);
  }

});


app.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`);
})
