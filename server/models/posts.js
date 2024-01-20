const mongoose = require("mongoose");
const { uuidv4 } = require('uuid');


const postModel = mongoose.Schema(
  {
		id: { type: Number,  unique: true, required: true },
    title: { type: String, trim: true },
    userId: { type: Number, ref: "User" },
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    body: { type: String, trim: true },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;