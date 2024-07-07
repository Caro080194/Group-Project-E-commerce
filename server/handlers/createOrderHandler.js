const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require('uuid');
const dbName = 'e-wear_emporium';

const createOrderHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        // Initializing the collection
        const db = client.db(dbName);
        const ordersCollection = db.collection('orders');
        // Extracting the data needed from the body
        const { shippingInfo, items } = req.body;

        // Creation of the order if there is enough items in stock
        const newOrder = {
            _id: uuidv4(),
            shippingInfo,
            items,
        };

        // Insert order in the database
        const result = await ordersCollection.insertOne(newOrder);
        if (!result || !result.insertedId) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create order",
            });
        }
        const orderId = newOrder._id;
        // Send response if the order is successful
        return res.status(201).json({
            status: 201,
            message: "Order created successfully",
            _id: orderId
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    } finally {
        await client.close();
    }
}

module.exports = createOrderHandler;
