const express = require("express");

const {
  allComments,
  createComment,
  readComment,
  updateComment,
} = require("../controllers/comment_controller");

const router = express.Router();

router
  .post("/create:parentid", createComment)
  .get("/read:id", readComment)
  .put("/update:id", updateComment)
  .get("/all", allComments);

module.exports = router;
