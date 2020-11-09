const mongoose = require("mongoose");

// const PostSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // this represents the role the user has (basic vs contributing vs admin)
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Role",
//       },
//     ],
//     movies: {
//       type: Array,
//       required: false,
//     },
//     reviews: {
//       type: Array,
//       required: false,
//     },
//   },
//   // the collection the user model will be stored in
//   { collection: "Users" }
// );

// module.exports = mongoose.model("User", PostSchema);


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    movies: {
      type: Array,
      required: false,
    },
    reviews: {
      type: Array,
      required: false,
    },
  })
);

module.exports = User;
