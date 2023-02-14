import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/artists";

export function getArtists() {
  return http.get(apiEndpoint);
}

export function getArtWith(id) {
  console.log(id);
  return http.get(apiUrl + "/artworkWithArtists/" + id);
}

export function getArtworks(id) {
  console.log(id);
  return http.get(apiEndpoint + "/artworks/" + id);
}

export function getSearch(keyword) {
  return http.get(apiUrl + "/search?keyword=" + keyword);
}
