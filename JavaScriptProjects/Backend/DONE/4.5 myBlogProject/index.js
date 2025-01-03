import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res)=>{
    res.render("home.ejs");
})

app.post("/submitBlog", (req, res)=>{
    console.log(req.body)
    res.render("blogs.ejs",
        {
        blogtext: req.body["blogtitle"],
        blogtitle: req.body["blogtext"]
        }
    )

})

app.get("/home", (req, res)=>{
    res.render("home.ejs")
})


app.get("/blogs", (req, res)=>{
    res.render("blogs.ejs")
})


app.listen(port, ()=> {
    console.log(`Server is working on port ${port}`);
})

