import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/dashboard";

export function getDashboard() {
  return http.get(apiEndpoint);
}

export function getPress() {
  return http.get(apiUrl + "/press");
}

export function getBidHistory() {
  return http.get(apiUrl + "/mybids");
}

export function getFavorites() {
  return http.get(apiUrl + "/favorites");
}

export function getArtworks() {
  return http.get(apiUrl + "/artworks/my-artworks");
}

export function getHistory() {
  return http.get(apiUrl + "/myorders");
}

export function getAll() {
  return http.get(apiUrl + "/allorders");
}

export function addArtist(data) {
  return http.post(apiUrl + "/add-artist", data);
}

export function addIBAN(data) {
  return http.post(apiUrl + "/updateAngarishi", data);
}

export function addArtwork(data) {
  return http.post(apiUrl + "/add-artwork", data);
}

export function updateArtwork({ id, data }) {
  return http.post(apiUrl + "/update-artwork/" + id, data);
}

export function editAddress(data) {
  return http.post(apiUrl + "/address/add", data);
}

export function deleteAddress(id) {
  return http.post(apiUrl + "/address/delete/" + id);
}

export function removeItem(id) {
  return http.post(apiUrl + "/bag/delete/" + id);
}

export function createOrder({props}) {
  return http.post(apiUrl + "/create-order",{...props});
}

export function getAddress() {
  return http.get(apiUrl + "/myaddresses");
}

export function subscribe(data) {
  return http.post(apiUrl + "/subscribe", data);
}

export function contact(data) {
  return http.post(apiUrl + "/contact", data);
}

export function requestAuction(id) {
  return http.post(apiUrl + "/request-auction/" + id);
}

export function deleteArtwork(id) {
  return http.delete(apiUrl + "/delete-artwork/" + id);
}

export function getArtwork(id) {
  return http.delete(apiUrl + "/artworks/" + id);
}

export function cancelAuction(id) {
  return http.post(apiUrl + "/cancel-auction/" + id);
}

export const getBiography = (id) => {
  return http.get(`${apiUrl}/artists/biography/${id}`);
};

export const getMyBiography = () => {
  return http.get(`${apiUrl}/artists/my-biography`);
};

export const addBiography = (data) => {
  return http.post(`${apiUrl}/artists/add-biography`, data);
};

export const updateBiography = (data) => {
  return http.post(`${apiUrl}/artists/edit-biography`, data);
};
