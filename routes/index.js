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



module.exports = router;

