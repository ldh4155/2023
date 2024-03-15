import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  function handleLogout() {
    // 로컬 스토리지에서 토큰을 제거
    localStorage.removeItem('token');
    // 메인 페이지로 리디렉션
    history.push('/main');
  }

  // 로그아웃 버튼 클릭 시 로그아웃 처리
  return (
      <button onClick={handleLogout}>
        Logout
      </button>
  );
}

export default Logout;
