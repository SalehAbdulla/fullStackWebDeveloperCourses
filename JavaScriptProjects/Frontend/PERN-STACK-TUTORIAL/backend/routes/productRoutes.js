import expres from "express";
import {getAllProducts, createProduct} from "../controllers/productController.js";
const router = expres.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);


export default router;