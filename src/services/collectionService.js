import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/collections";

export function getCollections() {
  return http.get(apiEndpoint);
}

export function getCollection(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function getArtworksWithCollection() {
  return http.get(apiEndpoint + "/artworks");
}
