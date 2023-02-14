import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bag";

export function getBag() {
  return http.get(apiEndpoint);
}

export function addFavorites(id) {
  return http.post(apiUrl + "/favorites/add/" + id);
}

export function addComment({ id, comment }) {
  return http.post(apiUrl + "/create-comment", {
    artwork_id: id,
    comment: comment,
  });
}

export function deleteFavorites(id) {
  return http.post(apiUrl + "/favorites/delete/" + id);
}

export function addBag({ id, is_gift }) {
  return http.post(apiEndpoint + "/add/" + id, { is_gift });
}

export function requestPrice(id) {
  return http.post(apiUrl + "/artworks/request-price/" + id);
}

export function deleteBag(id) {
  return http.post(apiEndpoint + "/delete/" + id);
}
