"use strict";
const moment = require("moment");
const mongoose = require("mongoose");

const Comment = require("../models/comment_schema");
const Post = require("../models/post_schema");

const allComments = (req, res) => {
  //const parentEl = req.params.parentid;
  //console.log(parentEl);
  Comment.find({}, (error, comments) => {
    if (error) {
      console.log(error);
      return res.status(404).json();
    }
    return res.status(200).json({ comments: comments });
  });
};


const createComment = (req, res) => {
  const idOut = req.params.parentid.substring(1);
  console.log(idOut);
  const mongoId = mongoose.Types.ObjectId(idOut);
  console.log(mongoId);
  Comment.countDocuments({ _id: mongoId }, function (error, count) {
    if (error) {
      res.status(500).json();
    }
    if (count > 0) {
      const comment = new Comment(req.body.comment);
      comment.createdAt = moment(comment.createdAt);
      comment.parentID = req.params.parentid;
      comment.text = req.body.comment.text;
      console.log(req.body.comment.text);
      comment.save((error) => {
        if (error) {
          res.status(500).json();
        }
        res.status(201).json();
      });
    }
  });
  Post.countDocuments({ _id: mongoId }, function (error, count) {
    if (error) {
      res.status(500).json();
    }
    if (count > 0) {
      const comment = new Comment(req.body.comment);
      comment.createdAt = moment(comment.createdAt);
      comment.parentID = req.params.parentid;
      comment.text = req.body.comment.text;
      console.log(req.body.comment.text);
      comment.save((error) => {
        if (error) {
          res.status(500).json();
        }
        res.status(201).json();
      });
    }
  });
};

const readComment = (req, res) => {
  const idOut = req.params.id.substring(1);

  //console.log(idOut);
  const mongoId = mongoose.Types.ObjectId(idOut);
  //console.log(mongoId);

  Comment.findOne({ _id: mongoId }, (error, comment) => {
    if (error) {
      return res.status(500).json();
    }
    if (!comment) {
      return res.status(404).json();
    }
    return res.status(200).json({ comment: comment });
  });
};

const updateComment = (req, res) => {
  const idOut = req.params.id.substring(1);

  //console.log(idOut);
  const mongoId = mongoose.Types.ObjectId(idOut);
  //console.log(mongoId);

  Comment.findOne({ _id: mongoId }, (error, comment) => {
    if (error) {
      return res.status(500).json();
    }
    if (!comment) {
      return res.status(404).json();
    }
    //console.log(comment)
    comment.upvotes += 1;
    Comment.findByIdAndUpdate({ _id: comment._id }, comment, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json();
      }
      //console.log(comment)

      return res.status(204).json();
    });
  });
};

module.exports = {
  allComments,
  createComment,
  readComment,
  updateComment,
};
