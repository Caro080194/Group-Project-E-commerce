// Set up connection to the mongo database
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = 'e-wear_emporium';

//Retrieve all brands from Mongo data base
const getBrandsHandler = async (req, res) => {

    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(dbName);
        const brands = await db.collection("companies").find({}).toArray();

        if (brands.length === 0) {
            return res.status(404).send("No brands found");
        } else {
            return res.status(200).json({
                status: 200,
                data: brands
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: error.message });
    } finally {
        await client.close();
    }
};

module.exports = getBrandsHandler;