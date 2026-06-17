const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database successfully")
    } catch (err) {
        console.error("Error connecting to database", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;