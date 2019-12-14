// All of the router gets, posts, and puts are in this file.

// Controllers act as an interface between Model and View components to process logic and incoming requests, manipulate data using the Model component and interact with the Views to render the final output.

const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebars
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  
  burger.create(req.body.burger_name, function(result) {
    
    res.redirect("/");
  });
});


router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    
    res.sendStatus(200);
  });
});

module.exports = router;