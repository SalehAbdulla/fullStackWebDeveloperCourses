import express from "express";
import axios from "axios";


const app = new express();
const port = 3000;
const API_URL = "http://localhost:4000";


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res)=>{
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response.data);
        res.render("index.ejs", {posts: response.data});
    } catch (err){
        console.error(err);
    }
})

// render createAndModify page for new post
app.get("/new",(req, res)=>{
    res.render("createAndModify.ejs", {header: "New Post", submit: "Create Post"});
})

app.post("/add", async (req, res) => {
    try {
        const result = await axios.post(`${API_URL}/posts`, req.body);
        console.log("Axios response:", result.data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred.");
    }
});

// render createAndModify page for new post
app.get("/edit/:id", async (req, res)=>{

    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response);

    try {
      res.render("createAndModify.ejs", {post: response.data, header: "Edit Post", submit: "Submit"});
    } catch (err){
      console.error(err);
    }

})

app.post("/api/posts/:id", async (req, res)=>{
    try{
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
        res.redirect("/");
    } catch(err){
        console.error(err);
    }
})

// delete post
app.get("/delete/:id", async (req, res)=>{
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(400).json({message: "Error Fetching API"});
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})