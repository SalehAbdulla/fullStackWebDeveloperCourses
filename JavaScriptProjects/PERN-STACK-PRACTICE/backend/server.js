import express from "express";
import env from "dotenv";

import pg from "pg";
import helmet from "helmet";
import cros from "cors";
import morgan from "morgan";

// import router
import productRoutes from "./routes/productRoutes.js";

const app = express();
env.config();



const port = process.env.PORT;
export const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();


// Adding best practice middleware
app.use(express.json()); // passing in client entry to server
app.use(helmet()); // saftey
app.use(cros()); // passing HTTP headers
app.use(morgan("dev")); // console loggin http codes


// my middleware API to care of all CRUD product application
app.use("/api/products", productRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});