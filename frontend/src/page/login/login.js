import React, { useState } from 'react';

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = {
      userId: id,
      userPassword: password,
    };

    fetch("http://localhost:8080/api/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.isLogin === "True") {
          // 로그인이 성공하면 서버로부터 받은 토큰을 로컬 스토리지에 저장
          localStorage.setItem('token', json.token);
          props.setMode("WELCOME");
        } else {
          alert(json.isLogin);
        }
      });
  };

  return (
    <>
      <h2>로그인</h2>
      <div className="form">
        <p><input className="login" type="text" placeholder="아이디" onChange={event => setId(event.target.value)} /></p>
        <p><input className="login" type="password" placeholder="비밀번호" onChange={event => setPassword(event.target.value)} /></p>
        <p><input className="btn" type="submit" value="로그인" onClick={handleLogin} /></p>
      </div>
      <p>계정이 없으신가요?  <button onClick={() => props.setMode("SIGNIN")}>회원가입</button></p>
    </>
  );
}

export default Login;
