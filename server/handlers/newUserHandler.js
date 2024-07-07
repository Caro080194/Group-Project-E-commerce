const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const bcrypt = require('bcrypt');
const dbName = 'e-wear_emporium';
const { v4: uuidv4 } = require("uuid");

const newUserHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(dbName);
        const { fname, lname, phone, email, address, city, province, postcode, country, password, confirmPassword } = req.body;
        const requiredFields = ["fname", "lname", "phone", "email", "address", "city", "province", "postcode", "country", "password", "confirmPassword"];
        const missingFields = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === '');

        // Checking if all the required fields are completed
        if (missingFields.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Missing-Data"
            });
        }

        // Checking if the password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: "Passwords do not match",
            });
        }

        // Checking if the new user doesn't already have an account created
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(404).json({
                status: 404,
                message: `Error, there is already an account with this email`,
            });
        }

        // Hashing the password for security
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            _id: uuidv4(),
            fname,
            lname,
            phone,
            email,
            address,
            city,
            province,
            postcode,
            country,
            password: hashedPassword
        }

        const insertNewUser = await db.collection('users').insertOne(newUser);
        if (!insertNewUser || !insertNewUser.insertedId) {
            return res.status(500).json({
                status: 500,
                message: "Mongo error while creating new user",
            });
        }

        res.status(201).json({
            status: 201,
            _id: insertNewUser.insertedId,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    } finally {
        await client.close();
    }
}

module.exports = newUserHandler;