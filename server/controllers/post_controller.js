"use strict";
const moment = require("moment");
const mongoose = require("mongoose");

const Post = require("../models/post_schema");

const allPosts = (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      console.log(error);
      return res.status(500).json();
    }
    console.log("There are " + posts.length + " posts in the database.");
    return res.status(200).json({ posts: posts.reverse() });
  });
};

const createPost = (req, res) => {
  if (
    !(
      req.body.post.type == 3 ||
      req.body.post.type == 2 ||
      req.body.post.type == 1
    )
  ) {
    console.log(
      "Post must be of type 1, 2 or 3. Value shown as " + req.body.post.type
    );
    return res.status(400).json();
  }
  const post = new Post(req.body.post);
  post.createdAt = moment(post.createdAt);
  post.title = req.body.post.title;
  post.type = req.body.post.type;
  post.contents = req.body.post.contents;
  post.mediaUrl = req.body.post.mediaUrl;
  post.save((error) => {
    if (error) {
      res.status(500).json(error);
    }
    console.log("New record created!");
    res.status(201).json();
  });
};

const readPost = (req, res) => {
  const idOut = req.params.postid.substring(1);
  //console.log(idOut);
  const mongoId = mongoose.Types.ObjectId(idOut);
  //console.log(mongoId);

  Post.findOne({ _id: mongoId }, (error, post) => {
    if (error) {
      console.log(error);
      return res.status(500).json();
    }
    if (!post) {
      return res.status(404).json();
    }
    return res.status(200).json({ post: post });
  });
};

const updatePost = (req, res) => {
  const idOut = req.params.postid.substring(1);
  //console.log(idOut);
  const mongoId = mongoose.Types.ObjectId(idOut);
  //console.log(mongoId);

  Post.findOne({ _id: mongoId }, (error, post) => {
    if (error) {
      console.log(error);
      return res.status(500).json();
    }
    if (!post) {
      return res.status(404).json();
    }

    post.upvotes += 1;
    Post.findByIdAndUpdate({ _id: post._id }, post, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
};

module.exports = {
  allPosts,
  createPost,
  readPost,
  updatePost,
};
