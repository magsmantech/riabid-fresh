import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/curators";

export function getCurators() {
  return http.get(apiEndpoint);
}

export function getCurator(id) {
  return http.get(apiEndpoint + "/" + id+'/artworks');
}

export function getArtworksWithCollection() {
  return http.get(apiEndpoint + "/artworks");
}
