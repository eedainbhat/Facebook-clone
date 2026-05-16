const mongoose = require("mongoose");
require('dotenv').config();
const DB_PATH = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongoose");
    } catch (err) {
        console.log("Error while connecting to Mongoose", err);
    }
};

module.exports = connectDB;