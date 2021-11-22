<template>
  <div v-show="formVisibility" class="new-post-overlay">
    <div class="container-fluid py-5 custom-bg-dark new-post">
      <div @click="toggleNewPostForm" class="exit-np-window">
        <img src="@/assets/x-circle.svg" height="24px" width="24px" />
      </div>
      <form id="newPostForm" @submit.prevent="handleSubmit">
        <h1 style="width: 100%; text-align: center">New Post</h1>
        <div
          style="width: 60% !important; display: inline-block !important"
          class="mb-3"
        >
          <label for="titleInput" class="form-label">Title of post</label>
          <input
            type="text"
            class="form-control"
            id="titleInput"
            v-model="post.title"
            aria-describedby="titleInput"
          />
          <div
            :class="post.title == '' ? 'warning-text' : 'un-warning-text'"
            id="titleInput"
            class="title-text form-text"
          >
            You must enter a title first.
          </div>
        </div>
        <div
          style="width: 30% !important; float: right !important"
          class="mb-3"
        >
          <label for="typeInput" class="form-label">Choose post type:</label>
          <select
            class="form-select form-select mb-3"
            aria-label=".form-select-lg"
            v-model="post.type"
          >
            <option
              v-for="option in options"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-if="post.type == 1" class="text-post mb-3">
          <label for="inputMainContent" class="form-label">Post Content</label>
          <textarea
            cols="50"
            rows="6"
            :disabled="post.title == ''"
            type="text"
            class="form-control"
            v-model="post.contents"
            id="inputMainContent"
          />
        </div>
        <div v-if="post.type != 1" class="media-post mb-3">
          <label for="mediaLink" class="form-label"
            >Media must be posted in a URL format:</label
          >
          <input
            :disabled="post.title == ''"
            type="text"
            class="form-control"
            id="mediaLink"
            v-model="post.mediaUrl"
            placeholder="https://..."
          />
        </div>
        <button
          type="submit"
          :disabled="
            (post.type == 1 && post.contents == '') ||
            (post.type != 1 && post.mediaUrl == '')
          "
          class="btn btn-primary"
        >
          Create New Post!
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import * as postService from "@/services/PostService.js";

export default {
  name: "new-post",
  data: function () {
    return {
      formVisibility: false,
      post: {
        title: "",
        type: 1,
        contents: "",
        mediaUrl: "",
      },
      options: [
        { text: "Text", value: 1 },
        { text: "Image", value: 2 },
        { text: "Video", value: 3 },
      ],
    };
  },
  inject: ["refreshposts"], 
  methods: {
    //This function displays and hides the "NewPost" display from the webpage
    toggleNewPostForm() {
      this.formVisibility = !this.formVisibility;
    },
    resetForm: function () {
      this.post.title = "";
      this.post.type = 1;
      this.post.contents = "";
      this.post.mediaUrl = "";
    },
    //This function sends the new post to the server to create a new record in the database
    handleSubmit: async function () {
      //Clears selection of unused inputs before sending communication
      if (this.post.type == 1) {
        this.post.mediaUrl = "";
      }
      if (this.post.type != 1) {
        this.post.contents = "";
      }
      //Packages and sends request to server route
      const request = {
        post: this.post,
      };
      await postService.createPost(request);
      this.resetForm();
      this.toggleNewPostForm();
      this.refreshposts();
    },
  },
  mounted() {
    //This outputs the "toggleNewPostForm()" function to the rest of the application so it can be used in different areas of the site, namely the navigation menu to open this form.
    this.$root.$on("NewPost", () => {
      this.toggleNewPostForm();
    });
  },
};
</script>
