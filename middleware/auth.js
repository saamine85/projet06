// we want to protect our routes with this middleware auth.js

// we need for authentication  our jsonwebtoken
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get token in header authentication
    const token = req.headers.authorization.split(" ")[1]; // a voir avec mentor
    const decodeToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //when we decode a toekn we have an object
    const userId = decodeToken.userId;

    // give a request userid an userid for security ==> voir avec le mentor
    // req.userId = userId; or

    req.auth = { userId: userId }; // racourcis {userId}

    //verify if the request userid match with the decodetoken userid
    if (req.body.userId && req.body.userId !== userId) {
      throw "user ID non valable";
    } else {
      next();
    }
  } catch (error) {
    // problem with authentication
    res.status(401).json({ error: error | "requête non authentifier" });
  }
};

// La méthode  verify()  du package jsonwebtoken permet de vérifier la validité d'un token (sur une requête entrante, par exemple).

// Ajoutez bien votre middleware d'authentification dans le bon ordre sur les bonnes routes.
// n.b: Attention aux failles de sécurité !
