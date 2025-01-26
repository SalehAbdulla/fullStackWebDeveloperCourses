import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page

app.get("/", async (req, res)=>{
  const response = await axios.get(`${API_URL}/posts`);
  try {
    res.render("index.ejs", {posts: response.data});
  } catch (err){
    console.error(err);
  }
})

// Route to render the edit page

app.get("/edit/:id", async (req, res)=> {
  const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
  console.log(response);
  try {
    res.render("modify.ejs", {post: response.data, heading: "Edit Post", submit: "Submit"});
  } catch (err){
    console.error(err);
  }
})

// Create a new post

app.get("/new", async (req, res)=>{
  res.render("modify.ejs", {heading: "New post", submit: "Submit"});
})

app.post("/api/posts", async (req, res)=>{
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (err){
    console.error(err);
  }
})


// Partially update a post

app.post("/api/posts/:id", async (req, res)=>{
  try{
    await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
})


// Delete a post

app.get("/api/posts/delete/:id", async (req, res)=>{
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`)
    res.redirect("/");
  } catch (err){
    console.log(err);
  }
})


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
