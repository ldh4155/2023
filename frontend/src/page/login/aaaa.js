 import React, { useState } from 'react';
function Signin(props) {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickname: "",
    phone: "",
    address: "",
    email: "",
    birth: "",
  });

  const [formErrors, setFormErrors] = useState({
    idError: "",
    passwordError: "",
    nameError: "",
    nicknameError: "",
    birthError: ""
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setFormErrors(prev => ({ ...prev, passwordError: '입력한 비밀번호가 같지 않습니다.' }));
      return;
    }

    if (!formData.birth) {
      setFormErrors(prev => ({ ...prev, birthError: "생년월일은 필수 항목입니다." }));
      return;
    }

    // 유효성 검사 추가...

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();

      if(json.isSuccess === "True") {
        localStorage.setItem('token', json.token);
        alert('회원가입이 완료되었습니다!');
        props.setMode("LOGIN");
      } else {
        setFormErrors(prev => ({ ...prev, [`${json.field}Error`]: json.message }));
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const { idError, passwordError, nameError, nicknameError, birthError } = formErrors;

  return (
      <>
        <h2>회원가입</h2>
        <div className="form">
          <input name="id" type="text" placeholder="아이디" onChange={handleChange}/>
          <p style={{color: "red"}}>{idError}</p>
          <input name="password" type="password" placeholder="비밀번호" onChange={handleChange}/>
          <input name="passwordConfirm" type="password" placeholder="비밀번호 확인" onChange={handleChange}/>
          <p style={{color: "red"}}>{passwordError}</p>
          <input name="name" type="text" placeholder="이름" onChange={handleChange}/>
          <p style={{color: "red"}}>{nameError}</p>
          <input name="nickname" type="text" placeholder="닉네임" onChange={handleChange}/>
          <p style={{color: "red"}}>{nicknameError}</p>
          <input name="phone" type="text" placeholder="휴대폰 번호" onChange={handleChange}/>
          <input name="address" type="text" placeholder="주소" onChange={handleChange}/>
          <input name="email" type="email" placeholder="이메일" onChange={handleChange}/>
          <input name="birth" type="date" placeholder="생년월일" onChange={handleChange}/>
          <p style={{color: "red"}}>{birthError}</p>
          <input name="transactionCount" type="number" placeholder="거래 횟수" onChange={handleChange}/>
          <input name="profileImage" type="file" onChange={handleChange}/>
          <input type="submit" value="회원가입" onClick={handleSignUp}/>
        </div>
      </>
  );
}

export default Signin;
