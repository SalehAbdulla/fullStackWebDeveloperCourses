import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const port = 3000;
const app = express();
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "YaZahraa@135",
  port: 5432,
})

db.connect()


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


async function getCountries(){
  let countries = [];
  const getCountriesFromDb = await db.query("SELECT country_code FROM visited_countries");
  getCountriesFromDb.rows.forEach((country)=>{
    countries.push(country.country_code);
  })
  return countries;
}

app.get("/", async (req, res)=>{
  const countries = await getCountries();
  res.render("index.ejs", {countries: countries, total: countries.length});
  console.log(countries);
})


app.post("/add", async (req, res)=>{
  const userInput = req.body.country;
  try {
    const foundCountry = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ", [userInput.toLowerCase()]);
    const country = foundCountry.rows[0];  // get access to rows index 0
    const country_code = country.country_code;  // tab into country_code
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
      res.redirect("/");
    } catch (err) {
      const countries = await getCountries();
      res.render("index.ejs", {countries: countries, total: countries.length, error: "Country already exist!"});
    }
  } catch (err) {
    const countries = await getCountries();
    res.render("index.ejs", {countries: countries, total: countries.length, error: "Country not found!"});
  }
})





app.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`);
})