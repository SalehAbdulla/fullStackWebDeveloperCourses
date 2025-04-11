import expres from "express";

const router = expres();

// Get all products
router.get("/" , getAllProducts);

// Get a specific product
router.get("/:id", getProduct);

// Update a specific product
router.patch("/:id", updateProduct);

// create a product
router.post("/", createProduct);

// delete a specific product
router.delete("/:id", deleteProduct);


export default router;