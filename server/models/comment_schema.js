const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    parentID: String,
    text: String,
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("comments", commentSchema);
