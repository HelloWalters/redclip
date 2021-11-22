import { http } from "./HttpService";

export function createPost(post) {
  return http().post("/posts/create", post);
}

export function readPost(id) {
  return http().get(`/posts/read:${id}`);
}

export function upvotePost(id) {
  return http().put(`/posts/update:${id}`);
}

export function getAllPosts() {
  return http().get("/posts/all");
}

/*  .post('/create', createPost)
  .get('/read:postid', readPost)
  .put('/update:postid', updatePost)
  .get('/all', allPosts);*/
