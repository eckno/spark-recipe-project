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

const express = require('express');
const router = express.Router();


//route for our index page.

 router.get("/", (req, res) => {
     //lets render our ejs page
     res.render("index", (req, {
         title: "Index Page"
     }));
 });


 //endpoint to get recipie by ID(might change this to name later, but thats more complicated right now)
 //it works based off a data base, but as of 5pm 05/06 i have not implemented this.
 router.get('/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
   // const recipe = recipes.find(r => r.id === recipeId);
   // if (recipe) {
   //     return res.json(recipe);
   // } else {
   //     return res.status(404).send('Recipe not found');
   // }
});

router.post("/register", (req, res) => {
    let response = {};
    const user_data = req.body;
    if(user_data !== null && Object.keys(user_data).length > 0){
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if(email === ""){
            response['email'] = "Please provide an email address.";
        }
        if(username === ""){
            response['username'] = "Please provide a username.";
        }
        if(password === ""){
            response['password'] = "Please provide a secured password.";
        }
        if(confirm_password === ""){
            response['confirm_password'] = "Please confirm your password.";
        }

        if(password !== confirm_password){
            response['password'] = "Kindly make sure your password's are the same";
        }

        users.push(user_data);

        if(users.length > 0){
            response['success'] ="You have been successfully registered. Congratulations";
        }
 
    } else{
         response = {error: "you have provided an empy data. Please check your form"};
    }

    if(response !== "" || response !== null){
        return res.json(response)
    }
    
    return res.json({error: "Oops! something went wrong please check your request and try again."});
});


//route to create a new recipe
router.post('/recipes', async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
    return res.status(200).send(recipe);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});

//
module.exports = router;

