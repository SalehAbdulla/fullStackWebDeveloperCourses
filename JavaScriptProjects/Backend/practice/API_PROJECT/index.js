import express from "express";
import pg from "pg";

const app = new express();
const port = 4000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "posts",
    password: "YaZahraa@135",
    port: "5432",
});

db.connect();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetching data from database
async function getPostsFromDb(){
    let posts = [];
    const data = await db.query("SELECT * FROM posts");
    data.rows.forEach((post)=>{
        posts.push(post);
    })
    console.log(posts);
    return posts;
}

// Send all data to the server as long as its requested
app.get("/posts", async (req, res)=> {
    const posts = await getPostsFromDb();
    res.json(posts);
})

// Add functionality
app.post("/posts", async (req, res)=>{

    try {
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: new Date(),
        };

        await db.query("INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, $4)",
             [newPost.title, newPost.content, newPost.author, newPost.date]);
        res.status(201).json({message: "post Added Successfuly"});

    } catch (err){
        console.error(err);
    }

});

app.patch("/posts/:id", async (req, res)=>{

    const {title, content, author} = req.body;
    const {id} = req.params;

    try {

        if (!title || !content || !author) {
            res.status(400).json({message: "All fields must be exist"});
        }
        if (!id || isNaN(id)){
            res.status(400).json({message: "Not valid post id"});
        }

        const result = await db.query("UPDATE posts set title = $1, content = $2, author = $3 WHERE id = $4", 
            [req.body.title, req.body.content, req.body.author, req.params.id]);
            if (result.rowCount !== 0){
                res.status(200).json({message: "post edited successfully"});
            } else {
                res.status(500).json({message: "Error occure while editing post"});
            }

    } catch (err){
        console.error(err);
    }
})

// get post by id for easier editing -- will be shown in editing form
app.get("/posts/:id", async (req, res)=>{

    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);

        if (result.rows.length === 0){
            res.status(400).json({message:"Error founding post"});
        }

        res.status(200).json(result.rows[0]);

    } catch(err){
        console.error(err);
        res.status(500).json({meesage: "An error occure while fetching post"});
    }

})


// Delete post
app.delete("/posts/:id", async (req, res)=>{

    try {
        await db.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
        res.status(200).json({message: "Post deleted successfuly"});
    } catch (err){
        res.status(500).json({message: "Error Deleting post"});
    }

})

app.listen(port, ()=> {
    console.log(`API is running on port ${port}`);
})