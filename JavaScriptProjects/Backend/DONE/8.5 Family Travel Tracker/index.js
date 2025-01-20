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
})

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let currentUser = 1;
let users = [{}];

// get visited countries
async function getVisitedCountries(){
  const getVisited = await db.query("SELECT country_code from visited_countries WHERE user_id = $1; ",
    [currentUser]
  );
  const countries = [];
  getVisited.rows.forEach((country)=>{
    countries.push(country.country_code);
  })
  console.log(countries);
  return countries;
}

// get users information, and return user info
async function getUser(){
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUser);
}

// Get main page

app.get("/", async (req, res)=>{
  const countries = await getVisitedCountries();
  const user = await getUser();
  res.render("index.ejs",{
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color
  });
});


// add functionality 

app.post("/add", async (req, res)=>{
  const userInput = req.body.country;
  try {
    const foundCountry = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'; ", 
      [userInput.toLowerCase()]
    );
    const countryCode = foundCountry.rows[0];
    const result = countryCode.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [result, currentUser]);
      res.redirect("/");
    } catch (err){
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
});

// /user functionality

app.post("/user", async (req, res)=>{
  if (req.body.add == "new") {
    res.render("new.ejs");
  } else {
    const changeId = req.body.user;
    console.log(changeId);
    currentUser = changeId;
    res.redirect("/");
  }
});


// add user functionality

app.post("/new", async (req, res)=>{
  const userName = req.body.name;
  const userColor = req.body.color;

  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING * ;", [userName, userColor]);
  const newCurrentId = result.rows[0];

  currentUser = newCurrentId.id;
  res.redirect("/");

})
  

app.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`);
})