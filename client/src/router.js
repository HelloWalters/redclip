import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Posts from "./views/Posts.vue";
//import SinglePost from "./views/SinglePost.vue";
//import Post from "@/components/Posts/Post.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts,
    },
    //{                                I have removed these routes as I rendered 
    //  path: "/posts/:id",            them obsolete with updates made to the 
    //  name: "viewpost",              posts and bringing the comment forum onto 
    //  components: {                  the same page as all posts.
    //    default:SinglePost,
    //    post: Post
    //  },
    //  props: {
    //    default: true
    //  }
    //},
    {
      path: "*",
      redirect: "/",
    },
  ],
  linkActiveClass: "active",
});
