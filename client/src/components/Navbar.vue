<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img style="max-height: 5rem" src="../assets/redclip.png" />
        </router-link>
        <button
          class="navbar-toggler btn btn-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/posts">
                Posts
              </router-link>
            </li>
            <li class="nav-item">
              <div
                @click="toggleNewPost"
                class="new-post-link nav-link"
                aria-current="page"
              >
                New Post
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    toggleNewPost() {
      this.$root.$emit("NewPost");
    },
  },
};
</script>
