<template>
  <div id="app">
    <NewPost :inject="refreshposts"/>
    <Navbar />
    <div id="app-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import NewPost from "@/components/Posts/NewPost.vue";

export default {
  components: {
    Navbar,
    Footer,
    NewPost,
  },
  methods: {
    refreshposts() {
      this.$root.$emit("refreshposts");
    },
  },
  provide: function () {
    return {
      refreshposts: this.refreshposts
    }
  },
};
</script>
