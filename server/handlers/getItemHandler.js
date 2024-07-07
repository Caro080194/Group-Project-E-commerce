const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = 'e-wear_emporium';

const getItemHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(dbName);
        const itemsCollection = db.collection('items');

        const itemId = parseInt(req.params._id);

        // Validation if we have the item in stock 
        const existingItem = await itemsCollection.findOne({ _id: itemId });

        if (!existingItem || existingItem.numInStock === 0) {
            return res.status(400).json({
                status: 400,
                message: `Not enough stock for item ID ${itemId}. Available stock: ${existingItem ? existingItem.numInStock : 'Not found'}`,
            });
        }

        // Update the stock
        const updateStock = await itemsCollection.updateOne(
            { _id: itemId },
            { $inc: { numInStock: -1 } }
        );

        if (!updateStock || updateStock.modifiedCount !== 1) {
            return res.status(500).json({
                status: 500,
                message: `Failed to update stock for item: ${itemId}`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Stock has been updated",
            data: existingItem
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    } finally {
        await client.close();
    }
}

module.exports = getItemHandler;