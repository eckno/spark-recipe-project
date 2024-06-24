const DBConnect = require("../model/db");
const bcrypt = require("bcryptjs");

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


    async postDeleteRecipe(req, res) {
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
                    response['error_message'] = "You have successfully deleted your recipe!";

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


    async postEditRecipe(req, res) {
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


    async getRecipe(req, res) {
        const response = {};
        try{
            const get = req.body || {};
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

}


module.exports = RecipeController;
