const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
},
  Movies: {
    type: Array,
    required: false,
  },
  Reviews: {
    type: Array,
    required: false,
  }
});

module.exports = mongoose.model("User", PostSchema);
