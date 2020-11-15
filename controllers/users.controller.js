const User = require("../models/Auth/User.model");

exports.getUser = (request, response) => {
  const id = request.params.userId;

  User.findById(id)
    .then((user) => response.status(200).json(user))
    .catch((error) => response.status(500).json({ message: "error " + error }));
};
exports.searchUsers = (request, response) => {
  const search = request.params.searchQuery;
  console.log("searching " + search);

  // Movie is the model, find: method on mongoose. returns all the Movies with no params
  // const movies = await Movie.fuzzySearch(search);
  User.aggregate([
    {
      $search: {
        text: { path: "username", query: search },
      },
    },
    {
      $limit: 20,
    },
  ])
    .then((users) => {
      if (!users) {
        response
          .status(404)
          .send({ message: "No users found with query " + search });
      } else {
        response.json(users);
      }
    })
    .catch((error) => response.status(500).send({ message: "error" + error }));
};

exports.getAllUsers = (request, response) => {
  console.log(request.query);
  // dynamically create a movie query
  let userQuery = {};
  for (var param in request.query) {
    console.log(param, request.query[param]);
    if (param !== "") {
      userQuery[param] = decodeURIComponent(request.query[param]);
    }
  }
  // limit to 20 movies returned from Database
  User.find(userQuery)
    .limit(20)
    .then((user) => response.status(200).json(user))
    .catch((error) => response.status(500).send({ message: "error" + error }));
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
  User.updateOne(
    // the document to update
    { _id: request.params.userId },
    //   update the information with JSON provided
    { $push: { reviews: review } }
  )
    .then((review) => response.status(200).json(review))
    .catch((error) => response.status(500).json({ message: "error " + error }));
};
