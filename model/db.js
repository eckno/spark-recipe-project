require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://spark_intern:14o37mniiVtPnu9V@spark-intern.u6obgpa.mongodb.net/?retryWrites=true&w=majority&appName=spark-intern';
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

module.exports = connectToDatabase;
