const express = require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const RecipeController = require("../controller/recipeController");


router.post('/add_new_user', async (req, res) => {
   const userController = new UserController();
    return userController.postAddNewUser(req, res);
});

router.post('/addrecipe', async (req, res) => {
  const recipeController = new RecipeController();
  return recipeController.postAddNewRecipe(req, res);
});

//router.post('/add_recipe', async (req, res) => {
  //  const  userController = new UserController();
    //return userController.postaddRecipe(req, res);

//});

//router.delete('/delete_recipe', async (req, res) => {
  //  const  userController = new UserController();
    //return userController.postdeleteRecipe(req, res);
//});

//router.put('/edit_recipe', async (req, res) => {
  //  const  userController = new UserController();
    //return userController.puteditRecipe(req, res);
//});

//router.get('/recipe', async (req, res) => {
  //  const  userController = new UserController();
    //return userController.getRecipe(req, res);
//});

//Routes for recipe operations
//router.post('/add-recipe', userController.addRecipe);
//router.delete('/delete-recipe/:recipeId', userController.deleteRecipe);
//router.put('/edit-recipe/:recipeId', userController.editRecipe);
//router.get('/recipe/:recipeId', userController.getRecipe);



module.exports = router;
