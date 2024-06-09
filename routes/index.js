const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const countries = require("recipiesjs");

const users = [];
//route for our index page.

 router.get("/", (req, res) => {
     //lets render our ejs page
     res.render("index", (req, {
         title: "Index Page"
     }));
 });

 //endpoint to get all recipies
 router.get("/", (req, res) => {
    return countries res.json (countries);
 });

 //endpoint to get recipie by ID(might change this to name later, but thats more complicated right now)
 //it works based off a data base, but as of 5pm 05/06 i have not implemented this.
 router.get('/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        return res.json(recipe);
    } else {
        return res.status(404).send('Recipe not found');
    }
});


//Middleware to parse JSON bodies
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required'});
        }

//Hash the password using bcrypt
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

//For demonstration, we're just returning the data.
res.status(200).json({message: 'User registered Successfully',
    user: {
        username,
        password: hashedPassword

        }
    }
)

router.listen(PORT, () => {
        console.log('Server running at http://localhost:${port}');
});

    }
})