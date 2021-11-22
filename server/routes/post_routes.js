const express = require("express");

const {
  allPosts,
  createPost,
  readPost,
  updatePost,
} = require("../controllers/post_controller");

const router = express.Router();

router
  .post("/create", createPost)
  .get("/read:postid", readPost)
  .put("/update:postid", updatePost)
  .get("/all", allPosts);

module.exports = router;
