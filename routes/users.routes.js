// separation of concerns
const express = require("express");

const router = express.Router();
const User = require("../models/Auth/User.model");

// we can delete and update these Movies using a parameter

// gets a user with a specific id
router.get("/:user", async (request, response) => {
  const id = request.params.user;
  try {
    // Movie is the model, find: method on mongoose. returns all the Movies with no params
    const user = await User.findById(id);
    response.json(user);
  } catch (error) {
    response.json({ message: error });
  }
});

// this is a general get request for users
router.get("/", async (request, response) => {
  try {
    // we are going to check our query params
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
    const user = await User.find(userQuery);
    // console.log(Movie);
    response.json(user);
  } catch (error) {
    console.log(request.query);

    response.json({ message: error });
  }
});

// adding a review to the user. 
router.put("/review/:userId", async (request, response) => {
  let review = {};
  for (var body in request.body) {
    console.log(body, request.body[body]);
    if (body !== "") {
      review[body] = decodeURIComponent(request.body[body]);
    }
  }
  console.log(review);
  try {
    const updatedUser = await User.updateOne(
      // the document to update
      { _id: request.params.userId },
      //   update the information with JSON provided
      { $push: { reviews: review } }
    );
    // send the updated Movie back
    response.json(updatedUser);
  } catch (error) {
    response.json({ message: error });
  }
});


module.exports = router;
