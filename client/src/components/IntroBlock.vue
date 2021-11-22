<template>
  <div class="main-item p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">
        <img style="max-height: 12rem" src="../assets/redclip.png" />
      </h1>
      <p class="col-md-8 fs-4">
        A Miniclip&trade; forum!
        <br /><br />
        RedClip is a web application built using a MEVN stack. MongoDB,
        ExpressJS, VueJS and NodeJS. The application allows for users to post
        content to the site anonymously; whether Text, Video or Imagery (the
        latter two from an external URL).
      </p>
      <p>
        Click below to view the existing posts on the site and create new
        content!
      </p>
      <router-link
        class="btn-gradient btn btn-primary btn-lg"
        type="button"
        to="/posts"
      >
        Go To Posts
      </router-link>
    </div>
  </div>
</template>
