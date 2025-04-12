import { db } from "../server.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const getProducts = await db.query("SELECT * FROM product");
        if (getProducts.rows.length === 0) {
            res.status(404).json({ success: false, message: "No products found" });
        } else {
            res.status(200).json({ success: true, data: getProducts.rows });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific product
export const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const getProductById = await db.query("SELECT * FROM product WHERE id=$1", [productId]);
        if (getProductById.rows.length === 0) {
            res.status(404).json({ success: false, message: "Product not found" });
        } else {
            res.status(200).json({ success: true, data: getProductById.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a specific product
export const updateProduct = async (req, res) => {
    const { name, image, price } = req.body;
    const productId = req.params.id;
    try {
        const updateProduct = await db.query("UPDATE product SET name=$1, image=$2, price=$3 WHERE id=$4 RETURNING *", [name, image, price, productId]);
        if (updateProduct.rows.length === 0) {
            res.status(404).json({ success: false, message: "Product not found" });
        } else {
            res.status(200).json({ success: true, data: updateProduct.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a product
export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;
    try {
        const createProduct = await db.query("INSERT INTO product (name, image, price) VALUES ($1, $2, $3) RETURNING *", [name, image, price]);
        res.status(201).json({ success: true, data: createProduct.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a specific product
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProduct = await db.query("DELETE FROM product WHERE id=$1 RETURNING *", [id]);
        if (deleteProduct.rows.length === 0) {
            res.status(404).json({ success: false, message: "Product not found" });
        } else {
            res.status(200).json({ success: true, data: deleteProduct.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
