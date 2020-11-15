const Movie = require("../models/Movie.model");

exports.getMovie = (request, response) => {
  const id = request.params.movieId;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        response.status(404).send({ message: "No movie found with id " + id });
      } else {
        console.log(movie);
        response.json(movie);
      }
    })
    .catch((error) => {
      response.status(500).send({ message: "Error " + error });
    });
};

exports.searchMovies = (request, response) => {
  const search = request.params.searchQuery;
  console.log("searching " + search);

  // Movie is the model, find: method on mongoose. returns all the Movies with no params
  // const movies = await Movie.fuzzySearch(search);
  Movie.aggregate([
    {
      $search: {
        text: { path: ["Title", "Plot", "Genre", "Year"], query: search },
      },
    },
    {
      $limit: 20,
    },
  ])
    .then((movies) => {
      if (!movies) {
        response
          .status(404)
          .send({ message: "No movies found with search query " + search });
      } else {
        response.json(movies);
      }
    })
    .catch((error) => response.status(500).send({ message: "error" + error }));
};

exports.createMovie = (request, response) => {
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
    Reviews: [],
  });
  console.log(request.body);
  movie
    .save()
    .then((movie) => response.json(movie))
    .catch((error) => response.status(500).send({ message: "error " + error }));
};

exports.deleteMovie = (request, response) => {
  const id = request.params.movieId;
  Movie.deleteOne({ _id: id })
    .then((deletedMovie) => response.status(200).json(deletedMovie))
    .catch((error) => response.status(500).json({ message: "error " + error }));
};

exports.updateMovie = (request, response) => {
  const id = request.params.movieId;
  let moviePatch = {};
  for (var body in request.body) {
    console.log(body, request.body[body]);
    if (body !== "") {
      moviePatch[body] = decodeURIComponent(request.body[body]);
    }
  }
  Movie.updateOne(
    { _id: id },
    //   update the information with JSON provided
    { $set: moviePatch }
  )
    .then((movie) => response.status(200).json(movie))
    .catch((error) => response.status(500).json({ message: "error " + error }));
};

exports.addReview = (request, response) => {
  let review = {};
  for (var body in request.body) {
    console.log(body, request.body[body]);
    if (body !== "") {
      review[body] = decodeURIComponent(request.body[body]);
    }
  }
  console.log(review);
  Movie.updateOne(
    // the document to update
    { _id: request.params.movieId },
    //   update the information with JSON provided
    { $push: { Reviews: review } }
  )
    .then((review) => response.status(200).json(review))
    .catch((error) => response.status(500).json({ message: "error " + error }));
  
};