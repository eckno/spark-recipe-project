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


router.delete('/deleterecipe', async (req, res) => {
const  recipeController = new RecipeController();
return recipeController.postDeleteRecipe(req, res);
});

router.post('/editrecipe', async (req, res) => {
const  recipeController = new RecipeController();
return recipeController.postEditRecipe(req, res);
});

router.get('/recipe', async (req, res) => {
const  recipeController = new RecipeController();
return recipeController.getRecipe(req, res);
});


module.exports = router;
