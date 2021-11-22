<template>
  <div class="comment-box">
    <div class="comment-text">
      <div class="mw-50">{{ comment.text }}</div>
    </div>
    <div class="comment-flex-container">
      <div class="comment-to-block upvote-container">
        <div
          @click="upvoteComment(comment._id)"
          :disabled="upvoted"
          class="upvote-icon"
        >
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
      <div
        class="comment-to-block"
        style="opacity: 0.5; font-style: italic; float: right"
      >
        {{ datePosted }}
      </div>
    </div>
  </div>
</template>

<script>
import * as commentService from "@/services/CommentService.js";
const moment = require("moment");
export default {
  props: {
    comment: Object,
  },
  data: function () {
    return {
      upvoted: false,
    };
  },
  methods: {
    sendUpvoteComment: function (commentId) {
      commentService.upvoteComment(commentId);
    },
    upvoteComment: function (commentId) {
      if (!this.upvoted) {
        this.upvoted = !this.upvoted;
        this.sendUpvoteComment(commentId);
      }
    },
    dateCommentPosted(date) {
      return moment(date).format("MMM Do 'YY - h:mm a");
    },
  },
  computed: {
    votes() {
      if (this.upvoted) {
        return this.comment.upvotes + 1;
      } else {
        return this.comment.upvotes;
      }
    },
    datePosted() {
      return moment(this.comment.createdAt).format("MMM Do 'YY - h:mm a");
    },
  },
};
</script>
