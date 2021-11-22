<template>
  <div class="main-container">
    <div class="posts-container">
      <Post :post="post" class="card custom-bg-dark" />
    </div>
  </div>
</template>

<script>
import * as postService from "@/services/PostService.js";
import * as commentService from "@/services/CommentService.js";
import Post from "@/components/Posts/Post.vue";
const moment = require("moment");
//import Comment from "@/components/Comments/Comment.vue";
export default {
  name: "viewpost",
  props: ["post_id"],
  components: {
    Post,
    // Comment,
  },
  data: function () {
    return {
      routeId: "",
      post: "",
      comments: "",
      showCommentInput: false,
      comment: {
        text: "",
      },
    };
  },
  computed: {
    datePosted() {
      return moment(this.post.createdAt).format("MMM Do 'YY - h:mm a");
    },
  },
  methods: {
    getPostId() {
      return this.$route.params.id;
    },
    toggleNewCommentForm() {
      this.showCommentInput = !this.showCommentInput;
    },
    resetForm() {
      this.comment.text = "";
      this.toggleNewCommentForm();
    },
    //This function sends the new post to the server to create a new record in the database
    handleSubmit: async function () {
      //Packages and sends request to server route
      const request = {
        comment: this.comment,
      };
      await commentService.createComment(this.post._id, request);
      this.resetForm();
    },
  },
  beforeRouteEnter(to, from, next) {
    postService.readPost(to.params.id).then((res) => {
      next((vm) => {
        vm.post = res.data.post;
        //console.log(res.data.posts);
      });
    }),
      commentService.getAllComments(to.params.id).then((res) => {
        next((vm) => {
          //console.log(to.params.id);
          vm.comments = res.data.comments;
        });
      });
  },
};
</script>
