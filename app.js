const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const db = require("./models/index");
const Role = db.role;

// we have the ability to create routes in a simple way
// we are able to make requests from local host ->
// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.Jul 4, 2020
var corsOptions = { origin: "http://localhost:8080" };

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }), express.json());

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
db.mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    initial();
  })
  .catch((error) => {
    console.error("Connection Errors", error);
  });
// we use this function to create the roles in the database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
// listen to server on this port
app.listen(8080);
