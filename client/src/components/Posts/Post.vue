<template>
  <div class="card custom-bg-dark">
    <h5 class="card-header">
      <strong>
        {{ post.title }}
      </strong>
      <div class="upvote-container">
        <div @click="upvote(post._id)" :disabled="upvoted" class="upvote-icon">
          <img
            v-show="!upvoted"
            class="circle"
            src="@/assets/arrow-up-circle.svg"
            height="18px"
            width="18px"
          />
          <img
            v-show="upvoted"
            class="circle"
            src="@/assets/arrow-up-circle-fill.svg"
            height="18px"
            width="18px"
          />
        </div>
        {{ votes }}
      </div>
      <p class="card-date">{{ datePosted }}</p>
    </h5>
    <div :class="[this.post.type != 1 ? 'iframe-body' : '']" style="padding-top:25px;" class="card-body">
      <button @click="toggleComments" class="post-comments btn btn-primary">
        {{ commentButtonText }}
      </button>
      <div
        :class="[this.post.type != 1 ? 'textAlignCenter' : '']"
        class="left-body"
      >
        <p v-show="showCommentSection" v-if="this.post.type == 1" class="card-text">
          {{ post.contents }}
        </p>
        <iframe
          class="iframe-item"
          v-if="this.post.type != 1"
          :src="`${this.post.mediaUrl}`"
        >
        </iframe>
      </div>
    </div>

    <div v-show="showCommentSection" class="comment-card custom-bg-dark">
      <span
        class="new-comment-span"
        v-show="!showCommentInput"
        @click="toggleNewCommentForm"
      >
        <p>
          <img src="@/assets/chat-square-text.svg" height="18px" width="18px" />
          Leave a comment!
        </p>
      </span>
      <form
        v-show="showCommentInput"
        @submit.prevent="handleSubmit"
        class="new-comment-form"
      >
        <textarea
          style="color: #252525 !important"
          type="text"
          placeholder="Start typing a new comment..."
          cols="50"
          rows="1"
          v-model="comment.text"
        >
        </textarea>
        <div class="new-comment-controls">
          <input
            type="submit"
            value="Submit"
            class="btn btn-success submit-comment"
          />
          <button
            @click="resetForm"
            type="button"
            class="btn btn-danger cancel-comment"
          >
            Cancel
          </button>
        </div>
      </form>
      <div v-if="filteredComments && filteredComments.length > 0">
        <h4 style="padding-top:25px; font-style:italic;">Comments:</h4>
        <span v-for="comment in filteredComments" :key="comment._id">
          <Comment :comment="comment"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import * as postService from "@/services/PostService.js";
import * as commentService from "@/services/CommentService.js";
import Comment from "@/components/Comments/Comment.vue";
const moment = require("moment");
export default {
  props: {
    post: Object,
    comments: Array,
  },
  components: {
    Comment,
  },
  inject: ["updateComments"], 
  data: function () {
    return {
      upvoted: false,
      commentUpvoted:false,
      showCommentInput: false,
      comment: {
        text: "",
      },
      showCommentSection: false,
      commentButtonText: "Show Post",
      nonCommentButtonText: "Hide Post",
      dataFilteredComments: [],
    };
  },
  methods: {
    toggleComments() {
      this.showCommentSection = !this.showCommentSection;
      var temp = this.commentButtonText;
      this.commentButtonText = this.nonCommentButtonText;
      this.nonCommentButtonText = temp;
    },
    sendUpvote: function (postId) {
      postService.upvotePost(postId);
    },
    upvote: function (postId) {
      if (!this.upvoted) {
        this.upvoted = !this.upvoted;
        this.sendUpvote(postId);
      }
    },
    sendUpvoteComment: function (commentId) {
      commentService.upvoteComment(commentId);
    },
    upvoteComment: function (commentId) {
      if (!this.commentUpvoted) {
        this.commentUpvoted = !this.commentUpvoted;
        this.sendUpvoteComment(commentId);
      }
    },
    toggleNewCommentForm() {
      this.showCommentInput = !this.showCommentInput;
    },
    resetForm() {
      this.comment.text = "";
      this.toggleNewCommentForm();
    },
    handleSubmit: async function () {
      //Packages and sends request to server route
      const request = {
        comment: this.comment,
      };
      await commentService.createComment(this.post._id, request);
      this.resetForm();
      this.updateComments();
      this.$forceUpdate();
    },
    dateCommentPosted(date) {
      return moment(date).format("MMM Do 'YY - h:mm a");
    },
  },
  computed: {
    parentIdToUse() {
      return ":" + this.post._id;
    },
    filteredComments() {
      return this.$props.comments.filter(
        (thisComment) => thisComment.parentID === this.parentIdToUse
      );
    },
    votes() {
      if (this.upvoted) {
        return this.post.upvotes + 1;
      } else {
        return this.post.upvotes;
      }
    },
    datePosted() {
      return moment(this.post.createdAt).format("MMM Do 'YY - h:mm a");
    },
  },
};
</script>
