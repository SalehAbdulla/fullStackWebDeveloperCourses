// import libraries
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
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

app.get("/secrets", (req, res)=>{
    if (req.isAuthenticated()){
        res.render("secrets.ejs");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res)=>{
    req.logout((err)=>{
        if (err) res.send(err);
        res.redirect("/");
    });
});

// Strategies
app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/auth/google/secrets", passport.authenticate("google", {successRedirect: "/secrets", failureRedirect: "/login"}));


// Post request
app.post("/login", passport.authenticate("local", {successRedirect: "/secrets", failureRedirect: "/login"}));

app.post("/register", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [username]);
        if (isEmailExist.rows.length == 0){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [username.toLowerCase(), hashedPassword]);
            const user = result.rows[0];
            req.login(user, (err) => {
                if (err) res.send("Error Occur");
                res.redirect("/secrets");
            });
        } else {
            res.send("Email Already Exist, try again later");
        }
    } catch (err){
        console.log(err);
        res.send("Error Occure, try again later");
    }
});



// passport local strategy

passport.use("local", new Strategy(async function verify(username, password, cb){
    
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1;", [username]);
        if (isEmailExist.rows.length > 0){
            const user = isEmailExist.rows[0];
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
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

// passport google strategy

passport.use("google", new GoogleStrategy({
    
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",

}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
        if (isEmailExist.rows.length === 0){
            const registerUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [profile.email, profile.id]);
            return cb(null, registerUser.rows[0]);
        } else {
            return cb(null, isEmailExist.rows[0]);
        }
    } catch (err){
        cb(err);
    }
}));


// Serialiaztion 
passport.serializeUser((user, cb)=>{
    return cb(null, user.id);
});

passport.deserializeUser(async (id, cb)=>{
    try {
        const isEmailExist = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (isEmailExist.rows.length == 0){
            return cb(null, false);
        } else {
            return cb(null, isEmailExist.rows[0]);
        }
    } catch {
        return cb("Error Occur");    
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

