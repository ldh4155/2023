import React, { useState } from 'react';
import {api} from "../../api/api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Login } from '../../redux/Action/LoginAction'

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({id,password});
    try {
      const response = await api.post(`login`, { id, password },{ withCredentials: true });
      alert("로그인 성공");
      dispatch(Login());
      localStorage.setItem("access", response.headers["access"]);
      console.log("성공:",response.headers)
      navigate('/');
    } catch (error) {
      console.log("실패:",localStorage.getItem("access"))
      console.error(error);
      alert("로그인 실패");
    }
  }

  return (
    <>
      <h2>로그인</h2>
        <div className="form">
          <p><input className="login" type="text" value={id} placeholder="아이디" onChange = {(e)=> setId(e.target.value)} /></p>
          <p><input className="login" type="password" value={password} placeholder="비밀번호" onChange = {(e)=> setPassword(e.target.value)} /></p>
          <p><input className="btn" type="submit" value="로그인" onClick={handleLogin} /></p>
        </div>
        <p>계정이 없으신가요?  <button onClick={() => navigate("/signup")}>회원가입</button></p>
    </>
  );
}

export default SignIn;