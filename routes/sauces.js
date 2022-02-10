const express = require("express");

// create an express router

const router = express.Router();

const sauceCtrl = require("../controllers/sauces");

// protect ou route with auth middleware

const auth = require("../middleware/auth");
router.post("/", auth, sauceCtrl.createSauce);
router.put("/:id", auth, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);

module.exports = router;



