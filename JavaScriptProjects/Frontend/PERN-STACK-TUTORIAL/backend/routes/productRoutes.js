import expres from "express";
import {getAllProducts, createProduct, updateProduct, getProduct, deleteProduct} from "../controllers/productController.js";

const router = expres.Router();

// Get all products
router.get("/", getAllProducts);

// Get product by specific id
router.get("/:id", getProduct);

// Create a new product
router.post("/", createProduct);

// Update a product
router.put("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct)


export default router;