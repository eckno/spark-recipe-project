const express = require('express');
const router = express.Router();
const UserController = require("../controller/userController");


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

router.post('/add_new_user', async (req, res) => {
    const userController = new UserController();
    return userController.postAddNewUser(req, res);
});

 module.exports = router;
