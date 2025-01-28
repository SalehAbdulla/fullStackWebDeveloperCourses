import bcrypt from "bcrypt";
import express from "express";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host, "localhost",
    database: "users",
    password: "YaZahraa@135",
    port: 5432,
});

const app = express();
const saltRounds = 12;

app.use(express.urlencoded({extended: true}));

// Hashing password
app.get("/register", async (req, res)=> {

    const username = req.body.username;
    const password = req.body.password;

    // check first if email not registerd before
    try {
        db.query("SELECT * FROM users WHERE email = $1;", [username]);

        // Hashing password
        bcrypt.hash(password, saltRounds, async (err, hash)=>{
            if (err){
                res.send("Error Hashing Password");
            } else {
                await db.query("INSERT INTO users (email, password) VALUES ($1, $2);", [username, hash]);
                res.render("/secrets.ejs");
            }
            
        })


    } catch (err){
        res.send("Email Already registerd, try to sign in.");
    }



})