import axios from "axios";
import { refreshAccessToken } from "./reissue";
import { returnLogin } from "./returnLogin";

export const api = axios.create({
  baseURL: `https://ilgoojo-server.p-e.kr:8080/api/`,
});

api.interceptors.request.use(
    config => {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers["access"] = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);


api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      
      localStorage.removeItem('access');
      console.log("원래 요청:", originalRequest);
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        const newAccessToken = localStorage.getItem('access');
        api.defaults.headers.common['access'] = newAccessToken;
        console.log("새로운 토큰으로 재요청:", originalRequest);
        originalRequest.headers['access'] = newAccessToken;  // 여기서 헤더를 직접 설정
        return api(originalRequest);
      } catch (refreshError) {
        console.log("재발급 중 오류 발생:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    if(error.response.status === 400 || error.response.status === 403) {
      returnLogin();
    }
    return Promise.reject(error);
  }
);