import { api } from "./api";
import store from '../redux/store';
import { LogoutUser } from "../redux/Action/LoginAction";
export const refreshAccessToken = async () => {
  try {
    const response = await api.post(`reissue`, {}, { withCredentials: true }); 
    const accessToken = response.headers["access"];
    console.log("access", accessToken);
    if (!accessToken) {
      throw new Error("Access token이 없습니다.");
    }
    localStorage.setItem("access", accessToken);
  } catch (error) {
    console.log("재발급 실패")
    localStorage.removeItem('access');
    console.error(error.response ? error.response.status : error.message);
    store.dispatch(LogoutUser());

    // Custom event 발생
    window.dispatchEvent(new CustomEvent("unauthorized"));
    throw error; //오류를 던져서 상위에서 처리하게 함
  }
};