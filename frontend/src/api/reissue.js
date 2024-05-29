import { api } from "./api";

export const refreshAccessToken = async () => {
  try {
    console.log("재발급 요청")
    const response = await api.post(`reissue`, {}, { withCredentials: true }); 
    console.log("재발급 성공")
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
    try {
      await api.post(`signout`, {}, { withCredentials: true });
    } catch (signoutError) {
      console.error("로그아웃 실패", signoutError);
    }

    // Custom event 발생
    window.dispatchEvent(new CustomEvent("unauthorized"));
    throw error; // 중요한 부분: 오류를 던져서 상위에서 처리하게 함
  }
};