import http from "./httpService";
import { apiUrl } from "../config.json";
import authService from "./authService";

const apiEndpoint = apiUrl + "/announce";

http.setJwt(authService.getJwt());

export function genPdf(
  caseNum,
  name,
  faName,
  idCode,
  address,
  reason,
  hour,
  presDate,
  notCom
) {
  return http.post(apiEndpoint, {
    caseNum,
    name,
    faName,
    idCode,
    address,
    reason,
    hour,
    presDate,
    notCom,
  });
}
export async function getPdf() {
  return http.get(apiEndpoint);
}
