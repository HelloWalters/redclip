<template>
  <div class="main-container">
    <div class="posts-container">
      <Post
        v-for="post in posts"
        :key="post._id"
        :post="post"
        :comments="comments"
        :inject="updateComments"
      >
      </Post>
      <div class="custom-bg-dark only-card">
        <span v-if="posts">That's all, folks!</span>
        <span v-else>There are no posts yet, check back later!</span>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Posts/Post.vue";
import * as postService from "@/services/PostService.js";
import * as commentService from "@/services/CommentService.js";

export default {
  name: "posts",
  components: {
    Post,
  },
  data: function () {
    return {
      posts: "",
      comments: [],
    };
  },
  provide: function () {
    return {
      updateComments: this.recallComments
    }
  },
  methods: {
    recallComments: function (){
      commentService.getAllComments().then((res) => {
        this.comments = res.data.comments;
      });
    },
    updateOnNewPost: function(){
      this.$forceUpdate();
    }
  },
  mounted() {
    //This outputs the "toggleNewPostForm()" function to the rest of the application so it can be used in different areas of the site, namely the navigation menu to open this form.
    this.$root.$on("refreshposts", () => {
      this.updateOnNewPost();
    });
  },
  created() {
    commentService.getAllComments().then((res) => {
      this.comments = res.data.comments;
    });
  },
  beforeRouteEnter(to, from, next) {
    postService.getAllPosts().then((res) => {
      next((vm) => {
        vm.posts = res.data.posts;
      });
    });
  },
};
</script>
