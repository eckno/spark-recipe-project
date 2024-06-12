// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // to use environment variables

const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
let dbInstance;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    dbInstance = client.db(); // Use default database specified in connection string

    console.log('Connected to MongoDB');
    return dbInstance;
}

module.exports = connectToDatabase;
