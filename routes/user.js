// we need express to create a router

const express = require("express");

// create an express router

const router = express.Router();

// add user controller from file controllers

const userCtrl = require("../controllers/user");

// creat routes post for each controllers in user.js

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//export this router
module.exports = router;






