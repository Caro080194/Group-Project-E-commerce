const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;
const bcrypt = require('bcrypt');
const dbName = 'e-wear_emporium';

console.log('MONGO_URI:', MONGO_URI);

const getLoginHandler = async (req, res) => {
    const { email, password } = req.body;
    const client = new MongoClient(MONGO_URI);

    // Checking if the user entered an email
    if (email === undefined || email === null || email === '') {
        return res.status(404).json({
            status: 404,
            message: "Please include an email"
        });
    }

    // Checking if the user entered a password
    if (password === undefined || password === null || password === '') {
        return res.status(404).json({
            status: 404,
            message: "Please include a password"
        });
    }

    // Connecting to database
    try {
        await client.connect();
        const db = client.db(dbName);
        const foundUser = await db.collection('users').findOne({ email });

        // Checking in the database if there is a user with this email
        if (!foundUser) {
            return res.status(404).json({
                status: 404,
                message: `Unable to find an account with the email: ${email}`,
            });
        }

        // Comparing the password given by the user to the database making sure they are the same
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Incorrect password",
            });
        }

        // If password and email are correct, send the user data except the password
        const { password: hashedPassword, ...userData } = foundUser;

        res.status(200).json({
            status: 200,
            message: "Login successful",
            user: userData
        });
        console.log("This is userData: ", userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    } finally {
        await client.close();
    }
};

module.exports = getLoginHandler;

