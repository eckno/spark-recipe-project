const express = require('express');
const router = express.Router();
const UserController = require("../controller/userController");

const recipe = [];


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

// Endpoint to update a recipe by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (updatedRecipe) {
//             res.json(updatedRecipe);
//         } else {
//             res.status(404).send('Recipe not found');
//         }
//     } catch (err) {
//         res.status(400).send('Bad request');
//     }
// });

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

router.post('/add_new_user', async (req, res) => {
    const userController = new UserController();
    return userController.postAddNewUser(req, res);
});

 module.exports = router;
