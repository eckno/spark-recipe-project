const DBConnect = require("../model/db");
const bcrypt = require("bcryptjs");
//const Recipe = require('../models/Recipe');

class UserController {

    constructor() {
        this.collectionName = "users";
    }

    async postAddNewUser(req, res) {
        const response = {};
        try{
            const post = req.body || {};
            //
            if(post){
                const email = post.email || "";
                const password = post.password || "";
                const verify_pass = post.confirm_password || "";
                const full_name = post.fullname || "";

                if (!email.trim() || !password.trim() || !verify_pass.trim() || !full_name.trim()){
                    response['success'] = false;
                    response['error_message'] = "Kindly make sure all required fields are correctly filled";

                    return res.status(400).send(response);
                }
                
                if(password !== verify_pass){
                    response['success'] = false;
                    response['error_message'] = "Your both password are not matching.";

                    return res.status(400).send(response);
                }

                /////NOW WE HAVE TO ENCRYPT THE PASSWORD WITH bcrypt LIBRARY LINK: https://www.npmjs.com/package/bcrypt
                let encrypted_password = "";
                const hashed_password = await bcrypt.hash(password, Number(process.env.BCRYPTSALT));
                if(hashed_password){
                    encrypted_password = hashed_password;
                }

                //NOW LETS SUBMIT TO DB
                const data_to_submit = {
                    email,
                    fullname: full_name,
                    password: encrypted_password
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


    //exports.deleteRecipe = async (req, res) => {
      //  const { recipeId} = req.params;

        //try {
          //  const deleteRecipe = await Recipe.findByIdAndDelete(recipeId);
           // if (!deletedRecipe) {
             //   return res.status(404).json({ message: 'Recipe not found'});
            //}
            //res.status(200).json({ message: 'Recipe deleted successfully'});
        //} catch (error) {
          //  res.status(500).json({message: 'Server Error', error});
        //}
    //};

    ///Edit (update) a recipe
    //exports.editRecipe = async (req, res) => {
      //  const {recipeId} = req.params;
        //const { title, ingredients, instructions } = req.body;

        //try {
          //  const updatedRecipe = await Recipe.findByIdAndUpdate(
            //    recipeId,
              //  { title, ingredients, instrctions },
                //{ new: true, runValidators: true}

            //);
            //if (!updatedrecipe) {
              //  return res.status(404).json({ message: 'Recipe not found'});
            //}
            //res.status(200).json(uodatedRecipe);
        //} catch (error) {
          //  res.status(500).json({ message:'Server Error', error});

        //}

    //}

//};

///Get a specific recipe (to support editing/viewing a recipe)
//exports.getRecipe = async (req, res) => {
  //  const { recipeId } = req.params;

    //try {
      //  const recipe = await Recipe.findById(recipeId);
        //if (!recipe) {
          //  return res.status(404).json({ message: 'Recipe not found'});
        //}
        //res.status(200).json(recipe);
    //} catch (error) {
      //      res.status(500).json({ message: 'Server Error', error});
    //}
//;




module.exports = UserController;