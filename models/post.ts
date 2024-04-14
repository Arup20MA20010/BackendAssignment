import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);
const postSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {},
  },
  { timestamps: true },
);
export const User = mongoose.model("User", userSchema);
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
