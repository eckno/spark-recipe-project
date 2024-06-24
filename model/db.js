require('dotenv').config();
const { MongoClient } = require('mongodb');

//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

//const recipeSchema = new Schema({
   // title: {
       // type: String,
        //required: true
    //},
    //ingredients: {
      //  type:[String],
      //  required: true
    //},
    //userId: {
        //type: Schema.Types.ObjectsId,
       // ref: 'User',
       // required: true
    //},
    //createdAt: {
        //type: Date,
       // default: Date.now 
    //}
//});


const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}
//module.exports = mongoose.model('Recipe', recipeSchema);

module.exports = connectToDatabase;
