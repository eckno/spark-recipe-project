const express = require('express');
const router = express.Router();

const recipe = require("recipe");

//route for our index page.

 router.get("/", (req, res) => {
     //lets render our ejs page
     res.render("index", (req, {
         title: "Index Page"
     }));
 });


 //endpoint to get recipie by ID(might change this to name later, but thats more complicated right now)
 //it works based off a data base, but as of 09/06 i have not implemented this.
 router.get('/:id', (req, res) => {
    //const recipeId = parseInt(req.params.id);
    //const recipe = recipe.find(r => r.id === recipeId);
    //if (recipe) {
    //    return res.json(recipe);
    //} else {
    //    return res.json({error: "Recipe not found"});
    //}
});

// Endpoint to create a new recipe
router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).send('Bad request');
    }
});

// Endpoint to update a recipe by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (updatedRecipe) {
            res.json(updatedRecipe);
        } else {
            res.status(404).send('Recipe not found');
        }
    } catch (err) {
        res.status(400).send('Bad request');
    }
});

// Endpoint to delete a recipe by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (deletedRecipe) {
            res.json(deletedRecipe);
        } else {
            res.status(404).send('Recipe not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Endpoint to fetch popular recipes
router.get('/popular', async (req, res) => {
    try {
        const popularRecipes = await Recipe.find().sort({ popularity: -1 }).limit(5); // Fetch top 5 popular recipes
        res.json(popularRecipes);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

 module.exports = router;