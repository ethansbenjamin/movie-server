const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  MovieId: {
    type: String,
    required: true,
  },
  Review: {
    type: String,
    required: true,
  },
  Score: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Review", PostSchema);
