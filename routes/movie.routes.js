const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

// we can delete and update these Movies using a parameter
router.get("/:movieId", movieController.getMovie);
// gets a movie with a specific id

router.get("/search/:searchQuery", movieController.searchMovies);

// submits a Movie
// we can create and read things with Postman to test out our API
router.post("/", movieController.createMovie);
router.delete("/:movieId", movieController.deleteMovie);
router.patch("/:movieId", movieController.updateMovie);

// adding a review to a movie.
router.put("/review/:movieId", movieController.addReview);
// export the router of this file
module.exports = router;
