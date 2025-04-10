import { db } from "../server.js";

// here all the functionality // CRUD

export const getAllProducts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM product");
        res.status(200).json({ success: true, data: result });
        console.log("Fetched products = " + result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "All Fields is a must" })
    }

}

export const createProduct = async (req, res) => {
    console.log(req.body);
    
    const { name, price, image } = req.body; // using middleware app.use(express.json());

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const insertedData = await db.query("INSERT INTO product VALUES ($1, $2, $3) RETURNING *", [name, price, image]);
        console.log(`new product added: ${insertedData}`);

        res.status(201).json({ success: true, data: insertedData });

    } catch (err) {
        console.log(`Error inserting a new product`);
        res.status(500).json({ success: false, message: "Internam Server Error" });

    }


};

export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const getSpecificProduct = await db.query("SELECT * FROM product WHERE id=$1", [id]);
        res.status(200).json({ success: true, data: getSpecificProduct });
    } catch (error) {
        console.log(`Error in getProduct function`, error);
        res.status(500).json({ success: false, message: "Error fetching data from database" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updateSpecificProduct = await db.query("UPDATE product SET name=$1, price=$2, image=$3 WHERE id=$4 RETURNING *", [name, price, image, id]);

        if (updateSpecificProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        } else {
            res.status(201).json({ success: true, data: updateSpecificProduct[0] });
        }

    } catch (err) {
        console.log(`Error in updateProduct function: ${err}`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const deleteProduct = await db.query("DELETE FROM product WHERE id=$1 RETURNING *", [id]);

        if (deleteProduct.length === 0) {
            return res.status(500).json({ success: false, message: "Error deleting product" });
        } else {
            res.status(200).json({ success: true, data: deleteProduct[0] });
        }

    } catch (error) {
        console.log(`Error in deleteProduct function: ${error}`);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};
