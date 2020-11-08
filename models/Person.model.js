const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Biography: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Movies: {
    type: Array,
    required: true,
  },
  Collaborators:{
    type: Array,
    required: true,
  },
  Awards: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Person", PostSchema);
