const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Plot: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Director: {
    type: String,
    required: true,
  },
  Actors: {
    type: String,
    required: true,
  },
  Runtime: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  imdbRating: {
    type: String,
    required: false,
  },
  Metascore: {
    type: String,
    required: false,
  },
  Ratings: {
    type: Array,
    required: false,
  },
  Language: {
    type: String,
    required: false,
  },
  Country: {
    type: String,
    required: false,
  },
  Released: {
    type: String,
    required: false,
  },
  Awards: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Movies", PostSchema);
