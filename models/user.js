// declare mongoose

const mongoose = require("mongoose");

// add as plugin mongoose unique validator

const uniqueValidator = require("mongoose-unique-validator");

// create our model  data base

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// applicate our plugin MUV to our shema before create model

userSchema.plugin(uniqueValidator);

// create our modele schema 

module.exports = mongoose.model("User", userSchema);

