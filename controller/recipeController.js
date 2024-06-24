const DBConnect = require("../model/db");
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb');

class RecipeController {

    constructor() {
        this.collectionName = "recipe";
    }

    async postAddNewRecipe(req, res) {
        const response = {};
        try{
            const post = req.body || {};
            //
            if(post){
                const title = post.title || "";
                const ingredients = post.ingredients || "";
                const instructions = post.instructions || "";
            
                if (!title.trim() || !ingredients.trim() || !instructions.trim() ){
                    response['success'] = false;
                    response['error_message'] = "Kindly make sure all required fields are correctly filled";

                    return res.status(400).send(response);
                }
                

                //NOW LETS SUBMIT TO DB
                const data_to_submit = {
                    title: title,
                    ingredients: ingredients,
                    instructions: instructions,
                }

                const db_connect = await DBConnect();
                const collection = db_connect.db().collection(this.collectionName);

                const add_new = await collection.insertOne(data_to_submit);
                if(add_new){
                    response['success'] = true;
                    response['data'] = add_new;

                    return res.status(201).send(response);
                }

                response['success'] = false;
                response['error_message'] = "Oops! we have encountered an issue, please try again later or contact support";
                return res.status(400).send(response);
            }
        } catch (e) {
            console.log(e);
            response['success'] = false;
            response['error_message'] = "Oops! we have encountered an issue, please try again later or contact support";
            return res.status(400).send(response);
        }
    }

     async deleteRecipe(req, res) {
        const { recipeId} = req.params;
 
         try {

            const db_connect = await DBConnect();
            const Recipe = db_connect.db().collection(this.collectionName);

            const deleteRecipe = await Recipe.deleteOne({ _id: new ObjectId(recipeId) });
            if (deleteRecipe.deletedCount === 0) {
                return res.status(404).json({ message: 'Recipe not found'});
             }
             res.status(200).json({ message: 'Recipe deleted successfully'});
         } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error', error});
         }
    };

    ///Edit (update) a recipe
    async editRecipe(req, res) {        
        try {
            const { title, ingredients, instructions, recipeId } = req.body;
            
            if (!title.trim() || !ingredients.trim() || !instructions.trim() || !recipeId.trim()){
                response['success'] = false;
                response['error_message'] = "Kindly make sure all required fields are correctly filled";
                return res.status(400).send(response);
            }
            
            const db_connect = await DBConnect();
            const Recipe = db_connect.db().collection(this.collectionName);

            const updatedRecipe = await Recipe.findOneAndUpdate(
                { _id: new ObjectId(recipeId) },
                { $set: { title, ingredients, instructions } },
                 { returnDocument: 'after', upsert: false}
             );
           
            if (!updatedRecipe) {
               return res.status(404).json({ message: 'Recipe not found'});
            }
            res.status(200).json(updatedRecipe);
        } catch (error) {
            console.log(error);
           res.status(500).json({ message:'Server Error', error});

        }
    }

    ///Get a specific recipe (to support editing/viewing a recipe)
 async getRecipe(req, res) {
   const { recipeId } = req.params;

    try {

        const db_connect = await DBConnect();
        const Recipe = db_connect.db().collection(this.collectionName);

       const recipe = await Recipe.findOne({ _id: new ObjectId(recipeId) });
        if (!recipe) {
           return res.status(404).json({ message: 'Recipe not found'});
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
           res.status(500).json({ message: 'Server Error', error});
    }

}

async recipeSearch(req, res) {
    const response = {};
try {
    const query = req.query || {};
    const name = query.name || "";

    if (!name.trim()) {
        response['success'] = false;
        response['error_message'] = "Recipe name is required for searching.";
        return res.status(400).send(response);
    }

    const db_connect = await DBConnect();
    const collection = db_connect.db().collection(this.collectionName);

    const recipe = await collection.findOne({ name: name.trim() });
    if (recipe) {
        response['success'] = true;
        response['data'] = recipe;
        return res.status(200).send(response);
    }

    response['success'] = false;
    response['error_message'] = "Recipe not found.";
    return res.status(404).send(response);
} catch (e) {
    console.log(e);
    response['success'] = false;
    response['error_message'] = "Oops! we have encountered an issue, please try again later or contact support";
    return res.status(500).send(response);
}
}

};


module.exports = RecipeController;
