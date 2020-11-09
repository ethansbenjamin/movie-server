const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    Name: String,
  })
);

module.exports = Role;
