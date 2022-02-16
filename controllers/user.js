  // we need to install bcrypt (npm i --save bcrypt)

const bcrypt = require("bcrypt");

// we need to install jsonwebtoken (npm i --save jsonwebtoken)

const jwt = require("jsonwebtoken");

//  read our controllers model

const User = require("../models/user");

//  functions for sign up new user

exports.signup = (req, res, next) => {
  // hash password after that save user in database
  bcrypt
    .hash(req.body.password, 10) // 10 is a number how many time to hash our password (salt round)
    .then((hash) => {
      // create a new user with our model mongoose
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // save it to our database
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur créer" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); // 500 error server
};

exports.login = (req, res, next) => {
  // find if the user exist  in our database
  // find if the mail in our database match with the mail in request body made from user
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        // user not found
        return res.status(401).json({ error: "utilisateur non trouvé" });
      }
      // find if the hash password in our database match with hash password from this user
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // not matched
          if (!valid) {
            return res.status(401).json({ error: "mot de passe incorrect" });
          }
          //  matched
          res.status(200).json({
            userId: user._id,
            // token: "TOKEN", // we nedd to add a plugin to generate and save tokens
            // set element to encode in our token
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET", // for production we use a long statement than thise one
              { expiresIn: "24h" } // after 24h our token is not availble
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); // 500 error server
    })
    .catch((error) => res.status(500).json({ error })); // 500 error server
};
