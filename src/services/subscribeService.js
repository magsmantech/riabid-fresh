import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/packages";

export function getSubscribes() {
  return http.get(apiEndpoint);
}

export function getDetails() {
  return http.get(apiUrl+'/user-details');
}

export function getSubscribe(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function createPackagePayment(props) {
  return http.post(apiUrl + "/packages/orders/create/"+props.id,{...props});
}