import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/settings";

export function getCoverImages() {
    return http.get(apiEndpoint + "/cover-images");
}


export function getCat(type) {
    return http.get(apiUrl +"/categories/"+ type['queryKey'][1]+"/artworks");
}