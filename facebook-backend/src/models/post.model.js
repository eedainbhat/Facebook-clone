const mongoose = require("mongoose");
const userModel = require("./user.model");

const postSchema = new mongoose.Schema({
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postPhoto: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timePosted: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timeCommented: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
