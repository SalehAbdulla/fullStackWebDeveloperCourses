import express from "express";
import pg from "pg";
import env from "dotenv";

// initialise enviroment variables
env.config();

// initialise applications
const app = express();
const port = 4000;
const db = new pg.Client({
    user: process.env.PG_USER,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect();



//CHALLENGE 1: GET All posts

//CHALLENGE 2: GET a specific post by id

//CHALLENGE 3: POST a new post

//CHALLENGE 4: PATCH a post when you just want to update one parameter

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/secret/delete/:id", async (req, res)=>{

    const secretId = req.params.id;
    try {
        await db.query("DELETE FROM secrets WHERE id = $1", [secretId]);
    } catch (err) {
        res.status(500).json({message: "Error deleting secret"});
    }
});


app.listen(port, () => {
    console.log(`API is running on port http://localhost:${port}`);
});
