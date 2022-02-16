const express = require("express");

// create an express router

const router = express.Router();

const sauceCtrl = require("../controllers/sauces");

// import controller like.js
const likeCtrl = require("../controllers/like");

// protect ou route with auth middleware

const auth = require("../middleware/auth");

// call middlware multer
const multer = require("../middleware/multer-config");

// add middleware multer to router post because we add another object contain image
// make sure that the niddlware auth is before mdw multer because we need auhentication before adding any file
// add middlware to our router.put

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
// systeme like dislike
// need the id of object that we liked

router.post("/:id/like", auth, likeCtrl.sauceLiked);

module.exports = router;
