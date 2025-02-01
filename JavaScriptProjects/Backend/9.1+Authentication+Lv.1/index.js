import express from "express";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import session from "express-session";
import passport from "passport";
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

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(session({
  secret: "TopSecretWord",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24},
}))

app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.get("/login", (req, res) => {
  res.render("login.ejs");
})

app.get("/register", (req, res) => {
  res.render("register.ejs");
})

// must sign in first to get into the page
app.get("/secrets", (req, res) => {
  
  console.log(req.user);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()){
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
  
});


// let the user register, check if email not exist first
app.post("/register", async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);

    if (isEmailExist.rows.length < 1) {
      const hashedPassword = await bcrypt.hash(password, saltRound);
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashedPassword]);
      const user = result.rows[0];
      
      req.login(user, (err)=>{
        if (err){
          res.send(err);
        } else {
          res.redirect("/secrets")
        }
      })

    } else {
      res.send("Email already exist");
    }

  } catch (err) {
    console.error(err);
  }

})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}))


passport.use(new Strategy(async function verify(username, password, cb){
  try {
    const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
    if (isEmailExist.rows.length > 0){

      const user = isEmailExist.rows[0];
      const hashedPassword = user.password;
      const isPassCorrect = await bcrypt.compare(password, hashedPassword);

      if (isPassCorrect){
        return cb(null, user);
      } else {
        return cb(null, false);
      }

    } else {
      return cb("Email does not exist");
    }

  } catch (err){
    return cb("User not found");
  }

}));


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0){
      cb(null, result.rows[0]);
    } else {
      cb(null, false);
    }
  } catch (err){
    cb(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})