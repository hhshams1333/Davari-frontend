import http from "./httpService";
import { apiUrl } from "../config.json";
import authService from "./authService";

http.setJwt(authService.getJwt());
const apiEndpoint = apiUrl + "/images";

export async function upload(caseNum, title, desc, file) {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("title", title);
  formData.append("desc", desc);

  return http.post(apiEndpoint + `/${caseNum}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function getCaseImages(caseNum) {
  return http.get(apiEndpoint + "/" + caseNum);
}

export async function getSingleImage(imageId) {
  return http.get(apiEndpoint + "/" + imageId);
}
