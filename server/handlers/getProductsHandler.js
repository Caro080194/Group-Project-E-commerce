const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const dbName = 'e-wear_emporium';


const getFilteredHandler = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI);
    const {sort, filters} = req.query
    
    let sortBy
    let sortFilters

    // sets filter categories and formats to array for mongo to $match
    if (!filters || filters.length === 0) {
        sortFilters =  ["Fitness", "Medical", "Lifestyle", "Entertainment", "Industrial", "Pets and Animals", "Gaming"]
    } else {
        sortFilters = filters.split(",")
    }
    
    // sets sort parameter and formats to object for mongo to $sort
    switch (sort) {
        case "AZ" :
            sortBy = {name : 1}
            break;
        case "ZA" :
            sortBy = {name : -1}
            break;
        case "priceLH" :
            sortBy = {price : 1}
            break;
        case "priceHL" :
            sortBy = {price : -1}
            break;
        default :
            sortBy = {name : 1}
        }
        
    try {
        await client.connect();
        const db = client.db(dbName);
        
        // retrieves products corresponding to filter and sorting parameters
        const products = await db.collection("items").aggregate(
            [
                {$match: {category : { $in : sortFilters }}},
                {$sort : sortBy},
            ], {
                collation: {
                    locale: "en_US",
                    numericOrdering: true
                }
        }).toArray()


        if (products.length === 0) {
            res.status(404).send("No products found");
        } else {
            res.status(200).json({
                status: 200,
                data: products
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: error.message });
    } finally {
        await client.close();
    }
};

module.exports = getFilteredHandler;
