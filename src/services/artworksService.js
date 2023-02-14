import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/artworks";

export function getArtworks() {
  return http.get(apiEndpoint);
}

export function getArtworksPride(id = 1) {
  return http.get(apiEndpoint + "?pride=" + id);
}

export function getArtworksRecomended(id = null) {
  return http.get(apiEndpoint + "?recomended=" + id);
}

export function getArtworksSpecial(id = 1) {
  return http.get(apiEndpoint + "?special=" + id);
}

export function getArtworksNew() {
  return http.get(apiEndpoint + "?sort=new");
}

export function getArtwork(id) {
  return http.get(apiEndpoint + "/" + id);
}
