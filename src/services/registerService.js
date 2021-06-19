import http from "./httpService";
import { apiUrl } from "../config.json";
import authService from "./authService";
http.setJwt(authService.getJwt());
const apiEndpoint = apiUrl + "/users";

export async function register(
  name,
  faName,
  idCode,
  postCode,
  phoneNumber,
  address,
  userAuth,
  caseNum
) {
  try {
    await http.post(apiEndpoint, {
      name,
      faName,
      idCode,
      postCode,
      phoneNumber,
      address,
      userAuth,
      caseNum,
    });
  } catch (ex) {
    console.log(ex);
  }
}
