// Controllers act as an interface between Model and View components to process logic and incoming requests, manipulate data using the Model component and interact with the Views to render the final output.

// All of the router gets, posts, and puts are in this file.

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

router.delete("/burgers/:id", function(req, res) {

  burger.delete(req.params.id, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
module.exports = router;