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


module.exports = router;
