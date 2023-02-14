import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bid";

export function bidArtwork({ id, bidAmount }) {
  return http.post(apiEndpoint + "/" + id, { bid_amount: bidAmount });
}
