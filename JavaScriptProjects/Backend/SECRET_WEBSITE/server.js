import express from "express";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";

// initialise enviroment variables
env.config();

// initialise applications
const app = express();
const port = 3000;
const saltRounds = 10;
const db = new pg.Client({
    user: process.env.PG_USER,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect();

// initialising middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24},
}));

app.use(passport.initialize());
app.use(passport.session());

// routes for public pages

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res)=>{
    res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.get("/register", (req, res)=>{
    res.render("register.ejs");
});

// Get routes for private pages
app.get("/secrets", (req, res)=>{
    if (req.isAuthenticated()){
        res.render("secrets.ejs");
    } else {
        res.redirect("/login");
    }
});



// -- API SECRET Application --

// Get all data and render secret page.

// Route to render the edit page

// Create a new post

// Partially update a post

// Delete a post




// register post request
app.post("/register", async (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (isEmailExist.rows.length === 0){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username.toLowerCase(), hashedPassword]);
            const user = result.rows[0];
            req.login(user, (err) => {
                if (err) return res.send(err);
                res.redirect("/secrets");
            });
        } else {
            res.send("Email already exist, try to register");
        }

    } catch (err){
        res.send(err);
    }

});


// Log in strategies -> LocalStrategy & GoogleStrategy

passport.use("local", new Strategy(async function verify(username, password, cb){
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (isEmailExist.rows.length > 0){
            const user = isEmailExist.rows[0];
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect){
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        } else {
            return cb("User not found, try to register");
        }
    } catch (err){
        return cb(err);
    }
}));


// Serilaistion

passport.serializeUser((user, cb) => {
    return cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0){
            const user = result.rows[0];
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    } catch (err){
        return cb(err);
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});
