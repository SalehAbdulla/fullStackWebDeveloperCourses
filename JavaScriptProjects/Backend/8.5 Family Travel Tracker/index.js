import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "YaZahraa@135",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let currentUserId = 1;
let users = [{}];

async function getUser(){
  const data = await db.query("SELECT * FROM users");
  users = data.rows;
  //console.log(data.rows[currentUserId]);
  //console.log(users);
  // using find loop to get the user based on currentUserId, I have checked index [] but page gets stuck -> data.rows[currentUserId]
  return users.find((user) => user.id == currentUserId);
}

getUser();

async function visited_countries(){
  const data = await db.query("SELECT * FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let result = [];
  data.rows.forEach((data)=> {
    result.push(data.country_code);
  });

  console.log(result);
  return result;
}

app.get("/", async (req, res)=>{
  const user = await getUser();
  const countries = await visited_countries();
  res.render("index.ejs", {users: users, countries: countries, color: user.color, total: countries.length});
})

// get page for per user

app.post("/user", async (req, res)=>{
  if (req.body.user) {
    currentUserId = await req.body.user;
    res.redirect("/");
  } else {
    res.render("new.ejs");
  }
})

// Add functionality

app.post("/new", async (req, res)=>{
  try {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [req.body.name, req.body.color]);
    res.redirect("/");
  } catch (err){
    console.error(err);
  }
})

// Search Functionality & Enter a new country for the user

app.post("/add", async (req, res)=> {

  const userInput = req.body.country;

  try {
    const searchCountry = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'; ", [userInput.toLowerCase()]);
    const foundCountry = searchCountry.rows[0];
    const result = foundCountry.country_code
    console.log(result);
    try {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2);", [result, currentUserId]);
      res.redirect("/");
    } catch(err){
      console.error(err);
    }
  } catch (err){
    console.error(err);
  }

})


app.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`);
})