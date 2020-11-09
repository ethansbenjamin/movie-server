const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    // this represents the role the user has (basic vs contributing vs admin)
    Roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    Movies: {
      type: Array,
      required: false,
    },
    Reviews: {
      type: Array,
      required: false,
    },
  },
  // the collection the user model will be stored in
  { collection: "Users" }
);

module.exports = mongoose.model("User", PostSchema);
