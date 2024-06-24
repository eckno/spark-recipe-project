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

router.post('/editrecipe', async (req, res) => {
  const recipeController = new RecipeController();
  return recipeController.editRecipe(req, res);
});

router.get('/deleterecipe/:recipeId', async (req, res) => {
  const recipeController = new RecipeController();
  return recipeController.deleteRecipe(req, res);
});


router.get('/recipe/:recipeId', async (req, res) => {
const  recipeController = new RecipeController();
return recipeController.getRecipe(req, res);
});

router.get('/search/:key', async (req, res) => {
    const recipeController = new RecipeController();
    return recipeController.recipeSearch(req, res);
     }
 );

module.exports = router;
