const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPeper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, max: 10, min: 1 },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisLiked: { type: Array, required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);

