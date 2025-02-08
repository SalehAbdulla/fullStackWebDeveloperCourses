// Import 8 packages
import express from "express";
import session from "express-session";
import { Strategy } from "passport-local";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import env from "dotenv";

// Initialise enviroment variables
env.config();

// Initialise application
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

// Initialise middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
}));
app.use(passport.initialize());
app.use(passport.session());

// Get Routes
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
        res.render("secrets.ejs");
    } else {
        res.redirect("/login");
    }
});

// Passport GoogleStrategy Get Routes
app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("auth/google/secrets", passport.authenticate("google", {successRedirect: "/secrets", failureRedirect: "/login"}));

// passport LocalStrategy post Routes for 
app.post("/login", passport.authenticate("local", {successRedirect: '/secrets', failureRedirect: "/login"}));

// post request
app.post("/register", async (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (result.rows.length === 0){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, hashedPassword]);
            const user = result.rows[0];
            req.login(user, (err)=>{
                if (err) console.error(err);
                res.redirect("/secrets");
            })
        } else {
            res.send("Email is already exist, try to log in");
        }
    } catch (err) {
        console.log(err);
        res.send("Error occure, try again later");
    }
});

// local Strategy
passport.use("local", new Strategy(async function verify(username, password, cb){
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            const isPassCorrect = await bcrypt.compare(password, storedHashedPassword);
            if (isPassCorrect){
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        } else {
            return cb("User not found");
        }
    } catch (err) {
        console.log(err);
        res.send("Error Occure, try again later");
    }
}));


// Google Strategy
passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        console.log(profile);
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1");
        if (isEmailExist.rows.length === 0){
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURINING *;", [profile.email, profile.id]);
            const user = result.rows[0];
            cb(null, user);
        } else {
            cb(null, false);
        }
    } catch (err){
        console.log(err);
        res.send("Error Occure, try again later");
    }
}));



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});