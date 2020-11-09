const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
// setting the user model for the database
db.user = require("./Auth/User.model");
// setting the roles of the database
db.role = require("./Auth/Role.model");
// writing valid roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
