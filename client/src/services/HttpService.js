import axios from "axios";

// Creates a global http method to use for making request to the server
export function http() {
  return axios.create({
    baseURL: "http://localhost:9000",
  });
}
