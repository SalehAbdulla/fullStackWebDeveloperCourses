import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
// Allow us to setup a new session to start saving user login sessions
import session from "express-session";
// passport middlewares
import passport from "passport";
// local strategy
import { Strategy } from "passport-local";



const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Create a new instance and pass the options
app.use(session({
  // This is a secret to bypass sign in 
  secret: "Secret",
  // In case we want to save the session in db
  resave: false,
  // To save the session in our server memory
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24},
}));

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return  next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "YaZahraa@135",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// if the user has an active session show him secrets page
app.get("/secrets", (req, res)=>{
  console.log(req.user);

  if (req.isAuthenticated()){
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
})

// log out & destroying the session
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return  next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err)=>{

            if (err){
              console.log(err);
            } else {
              res.redirect("/secrets");
            }

          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// This method going to trigger the strategy

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}))




// Register a new strategy passing in verify function

passport.use(new Strategy(async function verfiy(username, password, cb){
  //console.log(username);
  
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          cb(err);
        } else {
          if (result) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    return cb(err);
  }
}))


// save the data of the user to local storage
passport.serializeUser((user, cb) => {
  cb(null, user.id);
})


// deserialze user information and pass it to user
passport.deserializeUser(async (id, cb) => {

  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    if (result.rows.length > 0){
      cb (null, result.rows[0]);
    } else {
      cb(null, false);
    }
  } catch (err) {
    cb(err);
  }

});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
