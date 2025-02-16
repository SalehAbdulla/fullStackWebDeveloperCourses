import express from "express";
import axios from "axios";

// initialise application
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

// initilisation middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Get routes main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (err) {
    res.status(500).send({ message: "Error fetching API" });
  }
});

// Get route new post
app.get("/new", async (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create new post" });
});


// Get routes edit post
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", { post: response.data, heading: "Edit Post", submit: "Update Post" });
  } catch (err) {
    res.send(err);
  }
});

// patch route update post
app.post("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});



// add new post route
app.post("/api/posts", async (req, res)=>{
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (err){
    res.send(err);
  }
});


// delete post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (err){
    res.send(err);
  }
});



app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});