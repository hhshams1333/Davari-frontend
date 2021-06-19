import http from "./httpService";
import { apiUrl } from "../config.json";
import authService from "./authService";
const apiEndpoint = apiUrl + "/cases";

http.setJwt(authService.getJwt());

export function setCase(caseNum, value, p1, p2, arbi) {
  console.log("token: ", authService.getJwt());
  return http.post(apiEndpoint, { caseNum, value, p1, p2, arbi });
}

export function updateCase(id, caseNum, p1, p2) {
  return http.put(apiEndpoint + "/" + id, { caseNum, p1, p2 });
}

export function getAllCases() {
  return http.get(apiEndpoint);
}

export function getCase(_id) {
  return http.get(apiEndpoint + "/" + _id);
}

export function getCaseByCaseNum(caseNum) {
  return http.get(apiEndpoint + "/subCase/" + caseNum);
}

export function deleteCase(id) {
  return http.delete(apiEndpoint + "/" + id);
}
