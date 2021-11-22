const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    type: Number,
    contents: String,
    mediaUrl: String,
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("posts", postSchema);
