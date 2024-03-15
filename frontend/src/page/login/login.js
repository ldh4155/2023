import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props) {
    // const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        id : "",
        password: "",
    })

    const  navigation = useNavigate();

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        setFormData({ ...formData, [name]: value });

    };
    const handleLogin = () => {
        console.log(formData);

        fetch("http://localhost:3000/login", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return res.json();
            })
            .then((json) => {
                if (json.success) {
                    navigation("/");
                    localStorage.setItem('token', json.token);
                    props.setMode("WELCOME");

                } else {
                    alert("실패");
                    // 서버로부터 받은 에러 메시지를 사용자에게 표시
                }
            })
            .catch((error) => {
                console.error('로그인 중 문제가 발생했습니다:', error);
                alert('로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
            });
    };

    return (
        <>
            <h2>로그인</h2>
            <div className="form">
                <p><input className="login" type="text" name="id" placeholder="아이디" onChange = {handleChange} /></p>
                <p><input className="login" type="password" name="password" placeholder="비밀번호" onChange = {handleChange} /></p>
                <p><input className="btn" type="submit" value="로그인" onClick={handleLogin} /></p>
            </div>
            <p>계정이 없으신가요?  <button onClick={() => props.setMode("SIGNIN")}>회원가입</button></p>
        </>
    );
}

export default Login;
