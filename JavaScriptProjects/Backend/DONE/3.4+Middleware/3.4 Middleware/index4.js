import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); 
});

app.post("/submit", (req, res) => {
  res.sendFile(__dirname + "/public/submit.html");
  // { street: 'Hello', pet: 'World' }
  res.send(`<h1>Your Band Name is:</h1>`+ `${req.body['street']} ${req.body['pet']} 😎`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
