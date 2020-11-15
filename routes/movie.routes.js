const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const { authJwt } = require("../middleware");

// we can delete and update these Movies using a parameter
router.get("/:movieId", movieController.getMovie);
router.get("/search/:searchQuery", movieController.searchMovies);
router.get("/", movieController.getMovies);

//only moderators (contributors can edit records in the database)
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  movieController.createMovie
);
router.delete(
  "/:movieId",
  [authJwt.verifyToken, authJwt.isModerator],
  movieController.deleteMovie
);
router.patch(
  "/:movieId",
  [authJwt.verifyToken, authJwt.isModerator],
  movieController.updateMovie
);

// adding a review to a movie, which only users can do
router.put(
  "/review/:movieId",
  [authJwt.verifyToken],
  movieController.addReview
);
// export the router of this file
module.exports = router;
