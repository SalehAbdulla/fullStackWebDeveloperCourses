import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
  res.render("index.ejs",
    {title: "Write You Name ⬇️"}
  );
})


app.post("/submit", (req, res)=>{
  const firstNameLength = req.body["fName"].length;
  const lastNameLength = req.body["lName"].length;
  const totalNameLength = firstNameLength + lastNameLength;

  res.render("index.ejs",
    {title : `There are ${totalNameLength} letters in your name.`}
  )
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

