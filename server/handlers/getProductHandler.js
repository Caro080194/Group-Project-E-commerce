const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = 'e-wear_emporium';

//Finding a product by its ID
const getProductHandler = async (req, res) => {
    const { _id } = req.params;
    const client = new MongoClient(MONGO_URI);
    const productId = parseInt(_id);

    try {
        await client.connect();
        const db = client.db(dbName);
        const productData = await db.collection("items").findOne({ _id: productId });

        //Return an error message if product is not listed/found
        if (!productData) {
            return res.status(404).json({
                status: 404,
                message: "Could not find the item"
            });
        }

        res.status(200).json({
            status: 200,
            data: productData
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: error.message });
    } finally {
        await client.close();
    }
};

module.exports = getProductHandler;

