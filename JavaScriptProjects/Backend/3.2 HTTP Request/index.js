import express from "express";

const app = express();
const port = 3000;


app.get("/", (req, res)=>{
    res.send(`<h1>Hello World!</h1>`);
});

app.get("/about", (req, res)=>{
    res.send(`<h1>This is me EVERY DAY ALL DAY</h1>`)
})

app.get("/contact", (req, res)=>{
    res.send(`<h1>Phone: 38389522 </h1>`)
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});


