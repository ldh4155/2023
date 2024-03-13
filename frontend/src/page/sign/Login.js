import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({id,password});
    try {
      const response = await axios.post(`http://localhost:8080/login`, { id, password });
      localStorage.setItem('token', response.data);
      if(response.data==id){
        alert("로그인 성공");
        setIsLoggedIn(true);
        navigate('/');
      }
      else{
        alert("로그인 실패");
      }
    } catch (error) {
      alert("로그인 실패");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={e => setId(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;