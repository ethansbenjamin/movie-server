// separation of concerns
const express = require("express");

const router = express.Router();
const Movie = require("../models/Movie.model");


// we can delete and update these Movies using a parameter

// gets a movie with a specific id
router.get("/:movie", async (request, response) => {
  const id = request.params.movie;
  try {
    // Movie is the model, find: method on mongoose. returns all the Movies with no params
    const movies = await Movie.findById(id);
    response.json(movies);
  } catch (error) {
    response.json({ message: error });
  }
}
);

// this is a general get request for movies
router.get("/", async (request, response) => {
  try {
    // we are going to check our query params
    console.log(request.query);
    // dynamically create a movie query
    let movieQuery = {};
    for (var param in request.query) {
      console.log(param, request.query[param]);
      if (param !== "") {
        movieQuery[param] = decodeURIComponent(request.query[param]);
      }
    }
    // limit to 20 movies returned from Database
    const movie = await Movie.find(movieQuery).limit(20);
    // console.log(Movie);
    response.json(movie);
  } catch (error) {
    console.log(request.query);

    response.json({ message: error });
  }

});
// submits a Movie
// we can create and read things with Postman to test out our API
router.post("/", async (request, response) => {
  // without body parser,  it prints undefined
  // the information we receive is a JSON -> request
  const movie = new Movie({
    Title: request.body.Title,
    Runtime: request.body.Runtime,
    Year: request.body.Year,
    Director: request.body.Director,
    Genre: request.body.Genre,
    Actors: request.body.Actors,
    Plot: request.body.Plot,
    Poster: request.body.Poster,
    Ratings: request.body.Ratings,
    Metascore: request.body.Metascore,
    imdbRating: request.body.imdbRating,
  });
  console.log(request.body);

  try {
    const savedMovie = await movie.save();
    response.json(savedMovie);
  } catch (error) {
    response.json({ message: error });
  }
});

// delete the Movie
router.delete("/:movieId", async (request, response) => {
  try {
    const deletedMovie = await Movie.remove({ _id: request.params.movieId });
    response.json(deletedMovie);
  } catch (error) {
    response.json({ message: error });
  }
});

// update a Movie
router.patch("/:movieId", async (request, response) => {
  let moviePatch = {};
    for (var body in request.body) {
      console.log(body, request.body[body]);
      if (body !== "") {
        moviePatch[body] = decodeURIComponent(request.body[body]);
      }
    }
    console.log(moviePatch)
  try {
    const updatedMovie = await Movie.updateOne(
      { _id: request.params.movieId },
      //   update the information with JSON provided
      { $set: moviePatch }
    );
    // send the updated Movie back
    response.json(updatedMovie);
  } catch (error) {
    response.json({ message: error });
  }
});

// export the router of this file
module.exports = router;

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

// TODO: search users
// TODO: get a user with id
