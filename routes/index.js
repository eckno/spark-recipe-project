const express = require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const RecipeController = require("../controller/recipeController");

<<<<<<< HEAD
=======

 router.get("/", (req, res) => {
     res.render("index", (req, {
         title: "Index Page"
     }));
 });
 
 router.get('/:id', (req, res) => {
    //no logic yet
});

router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).send('Bad request');
    }
});

// Endpoint to update a recipe by name
 router.put('/:update', async (req, res) => {
     const userController = new UserController();
     return userController.updateRecipe(req, res);
 });

// Endpoint to delete a recipe by ID
router.delete('/:delete', async (req, res) => {
    const userController = new UserController();
    return userController.deleteRecipe(req, res);
});

// Endpoint to fetch popular recipes
/*router.get('/popular', async (req, res) => {
    try {
        const popularRecipes = await Recipe.find().sort({ popularity: -1 }).limit(5); // Fetch top 5 popular recipes
        res.json(popularRecipes);
    } catch (err) {
        res.status(500).send('Server error');
    }
});*/

router.get('/search/:key', async (req, res) => {
   const userController = new UserController();
   return userController.recipeSearch(req, res);
    }
);
>>>>>>> b63d2bab479f259a61591d7c98c0c36045f8bd22

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
