// import 8 packages
import express from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { Strategy } from "passport-local";
import bcrypt, { hash } from "bcrypt";
import env from "dotenv";
import pg from "pg";

// initialise enviroment variables
env.config()

// initialise applications
const app = express();
const port = 3000;
const saltRounds = 12;
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// initialise middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24},
}));
app.use(passport.initialize());
app.use(passport.session());

// Get routes

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/logout", (req, res)=>{
    req.logout((err)=>{
        if(err){
            res.send("Error occur, try again later.");
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
});

app.get("/secrets", (req, res)=>{
    if (req.isAuthenticated()){
        res.render("secrets.ejs");
    } else {
        res.redirect("/");
    }
});

// Get request with passport Strategy

app.get("/auth/google/", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/auth/google/secrets", passport.authenticate("google", {successRedirect: "/secrets", failureRedirect: "/login"}));

// post routes for local strategy
app.post("/login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));

// post routes 

app.post("/register", async (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
        if (isEmailExist.rows.length === 0){
            const hasedPassword = bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hasedPassword]);
            const user = result.rows[0];
            req.login(user, (err) => {
                res.redirect("/secrets");
            });
        } else {
            res.send("Email already Exist, try to sign in");
        }
    } catch (err){
        console.log(err);
        res.send("Error occure while registration, try again later.");
    }
});

// local strategy
passport.use("local", new Strategy(async function verify(username, password, cb){
    
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (result.rows.length > 0){
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            const isPassCorrect = await bcrypt.compare(password, storedHashedPassword);
            if (isPassCorrect){
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        } else {
            return cb("user does not exist");
        }
    } catch (err){
        return cb(err);
    }
    
}));

// Google Strategy

passport.use("google", new GoogleStrategy(
    {
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",

    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            console.log(profile.log);
            const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
            if (result.rows.length === 0){
                const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2);", [profile.email, "google"]);
                return cb(null, newUser.rows[0]);
            } else {
                return cb(null, result.rows[0]);
            }
        } catch (err){
            return cb(err);
        }
    }
));


// serialization & deserialization
passport.serializeUser((user, cb)=>{
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb)=>{
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1",[id]);
        if (result.rows.length > 0){
            cb(null, result.rows[0]);
        } else {
            cb(null, false);
        }
    } catch (err){
        console.log(err);
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})