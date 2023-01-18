const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Users = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", Users);
