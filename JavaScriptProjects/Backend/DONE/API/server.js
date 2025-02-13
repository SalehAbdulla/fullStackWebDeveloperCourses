import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";


// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Get all data and rend index page.

app.get("/", async (req, res)=>{
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("index.ejs", {posts: response.data});
    } catch (error) {
        res.status(500).json({message: "Error fetching API"});
    };
});


// Route to render the edit page

app.get("/new", async (req, res)=>{
    res.render("modify.ejs", { heading : "new post", submit : "Create post" });
});

app.get("/edit:id", async (req, res)=> {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("modify.ejs", { heading: "Edit Post", submit: "Update Post", post: response.data});
    } catch (error) {
        res.status(500).json({message: "Error Fetching post"});
    };
});


// Create a new post

app.post("/api/posts", async (req, res)=>{
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message: "Error Creating Post"});
    }
});


// Partially update a post

app.post("/api/posts/:id", async (req, res)=>{
    try {
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/")
    } catch (error) {
        res.status(500).json({message: "Error updating post"});
    };
});

// Delete a post

app.delete("/api/posts/delete/:id", (req, res)=>{
    try {
        axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message: "Error Deleting post"});
    };
});


app.listen(port, () => {
    console.log(`Backend is running API on port ${port}`)
});