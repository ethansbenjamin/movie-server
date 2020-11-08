const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// use json body parsing for our app
// app.use(bodyParser.json);
// body parser is now built into express

// we have the ability to create routes in a simple way
app.use(express.urlencoded({ extended: true }), express.json());
// we are able to make requests from local host ->
// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.Jul 4, 2020

app.use(cors());
// MIDDLEWARE
// a function that executes when routes are being hit

// post to create
// get to read
// put to update
// delete to delete
// CRUD

// import routes for movies
const movieRoutes = require("./routes/movies");
app.use("/movies", movieRoutes);

// ROUTES
app.get("/", (request, response) => {
  response.send("We are on the home");
});

// connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database")
);

// listen to server on this port
app.listen(8080);
