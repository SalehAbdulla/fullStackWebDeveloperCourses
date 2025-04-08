import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // make sure of writing .js extention at the end

dotenv.config(); // with this we can read enviroment variables

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // with the help of this, we can parse imcoming data.
app.use(cors()); // Enables Cross-Origin Resource Sharing.

// One of the packages I would have to use it almost in all my applications
app.use(helmet()); // helmet is a security middleware that helps us protect our application by setting various HTTP headers
app.use(morgan("dev")); // morgan will console.log the requests.

console.log(PORT);

// GET all products from DB, and sent it back as a res
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});