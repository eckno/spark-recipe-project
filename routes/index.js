///this is our index route file. you can create multiple route files inside the route folder.
const _ = require("underscore");
const express = require('express');
const router = express.Router();

const countries = require("countryjs");

const users = [];
//route for our index page.

 router.get("/", (req, res) => {
     //lets render our ejs page
     res.render("index", (req, {
         title: "Index Page"
     }));
 });

 module.exports = router;