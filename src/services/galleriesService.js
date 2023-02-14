import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/galleries";

export function getGalleries() {
  return http.get(apiEndpoint);
}

export function getGallery(id) {
  return http.get(apiEndpoint + "/" + id);
}
