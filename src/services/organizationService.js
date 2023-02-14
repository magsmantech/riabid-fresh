import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/organization/artworks";

export function getOrganizations() {
  return http.get(apiEndpoint);
}