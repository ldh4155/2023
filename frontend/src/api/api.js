import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:8080/`,
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

//access token 재발급 후 저장
const refreshAccessToken = async () => {
try {
  const response = await api.post(`reissue`, {}, { withCredentials: true });
  const accessToken = response.headers["access"];
  localStorage.setItem("access", accessToken);
} catch (error) {
  console.error(error);
}
};

api.interceptors.response.use(
response => {
  return response;
},
async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshAccessToken();
    api.defaults.headers.common['Access'] = localStorage.getItem('access');
    return api(originalRequest);
  }
  return Promise.reject(error);
}
);


// // 인증 토큰을 설정하는 함수
// export function setAuthToken() {

//     const token = localStorage.getItem("access");
//     if (token) {  
//         if(token.startsWith("Bearer ")) {
//             api.defaults.headers.common['access'] = `${token}`;      
//         } else {
//             api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//           }
//       // 모든 요청의 Authorization 헤더에 토큰 추가
      
//     } else {
//       // 토큰이 없으면 Authorization 헤더 삭제
//       delete api.defaults.headers.common['Authorization'];
//     }
//   }