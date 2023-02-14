import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auctions";

export function getAuctions() {
  return http.get(apiEndpoint);
}

export function getAuction(id) {
  return http.get(apiEndpoint + "/" + id);
}
