const mongoose = require("mongoose");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    movies: {
      type: Array,
      required: false,
    },
    reviews: {
      type: Array,
      required: false,
    },
  })
);

module.exports = User;
