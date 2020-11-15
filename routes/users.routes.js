// separation of concerns
const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users.controller");
const { authJwt } = require("../middleware");

// we can delete and update these Movies using a parameter

// gets a user with a specific id
router.get("/:userId", usersController.getUser);

router.get("/search/:searchQuery", usersController.searchUsers);

// this is a general get request for users
router.get("/", usersController.getAllUsers);

// adding a review to the user.
router.put("/review/:userId", [authJwt.verifyToken], usersController.addReview);

module.exports = router;
