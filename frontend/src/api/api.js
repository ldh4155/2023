import axios from "axios";

export const api = axios.create({
    baseURL:`http://localhost:8080/`,
})

// 인증 토큰을 설정하는 함수
export function setAuthToken() {

    const token = localStorage.getItem("Authorization");
    if (token) {  
        if(token.startsWith("Bearer ")) {
            api.defaults.headers.common['Authorization'] = `${token}`;      
        } else {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
      // 모든 요청의 Authorization 헤더에 토큰 추가
      
    } else {
      // 토큰이 없으면 Authorization 헤더 삭제
      delete api.defaults.headers.common['Authorization'];
    }
  }

