import { http } from "./HttpService";

export function createComment(parentid, comment) {
  return http().post(`/comments/create:${parentid}`, comment);
}

export function readComment(id) {
  return http().get(`/comments/read:${id}`);
}

export function upvoteComment(id) {
  return http().put(`/comments/update:${id}`);
}

export function getAllComments() {
  return http().get(`/comments/all`);
}
