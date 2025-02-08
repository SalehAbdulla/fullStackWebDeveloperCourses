// import libraries
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport";
import GoogleStrategy from "passport-google-oauth2"
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv";

// initialise applications


const app = express();
const port = 3000;
env.config();
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
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());


// Get Routes

app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/login", (req, res)=>{
    res.render("login.ejs");
});

app.get("/register", (req, res)=>{
    res.render("register.ejs");
});

app.get("/submits", (req, res)=>{
    if (req.isAuthenticated()){
        res.render("secrets.ejs");
    } else {
        res.redirect("/login");
    }
});

// Strategies

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/auth/google/secrets", passport.authenticate("google", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.post("/login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.post("/logout", (req, res) => {
    req.logout((err)=>{
        if (err) console.log(err);
        res.redirect("/");
    });
});

// post request

app.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // check if email exist
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);

        if (isEmailExist.rows.length === 0){
            const hasedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO users (email, passwrod) VALUES ($1, $2) RETRUNING *;", [username, hasedPassword]);

            req.login(user, (err)=>{
                if (err) res.status(500).send("Error Occur");
                res.redirect("/login");
            });

        } else {
            res.send("Email already Exist, try to sign in");
        }

    } catch (err){
        console.log(err);
        res.status(500).send("Error Occure, try again later");
    }
});


// Strategies

passport.use("local", new Strategy(async function verify(username, password, cb) {
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (isEmailExist.rows.length > 0){
            const user = isEmailExist.rows[0];
            const isPassCorrect = await bcrypt.compare(password, user.password);
            if (isPassCorrect) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        } else {
            return cb("User not found");
        }
    } catch (err){
        console.log(err);
        res.status(500).send("Error Occur");
    }
}));


passport.use("google", new GoogleStrategy({

    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",

}, async (accessToken, refreshToken, profile, cb)=>{
    try {
        // check if email exist
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
        if (isEmailExist.rows.length == 0){
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETRUNING *;", [profile.email, profile.id]);
            const user = result.rows[0];
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    } catch (err){
        return cb(err);
    }
}));




passport.serializeUser((user, cb)=>{
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb)=>{
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (isEmailExist.rows.length == 0){
            return cb(null, false);
        } else {
            const user = isEmailExist.rows[0];
            return cb(null, user);
        }
    } catch (err) {
        console.log(err);
    }
});



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});















