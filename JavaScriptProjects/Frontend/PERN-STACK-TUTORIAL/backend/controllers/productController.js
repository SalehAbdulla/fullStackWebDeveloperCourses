import { db } from "../server.js";

// here all the functionality

export const getAllProducts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM product");
        
    } catch (err) {

    }

}
export const createProduct = async (req, res) => { };

export const getProduct = async (req, res) => { };
export const updateProduct = async (req, res) => { };
export const deleteProduct = async (req, res) => { };
