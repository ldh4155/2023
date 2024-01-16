import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [transactionCount, setTransactionCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [birthError, setBirthError] = useState("");

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      setPasswordError('입력한 비밀번호가 같지 않습니다.');
      return;
    }

    else if (birth === "") {
      setBirthError("생년월일은 필수 항목입니다.");
      return;
    }
    
    else if (name === "") {
      setnameError("이름은 필수 항목입니다.");
      return;
    }

    else if (id === "") {
      idError("아이디은 필수 항목입니다.");
      return;
    }
    

    const userData = {
      userId: id,
      userPassword: password,
      userName: name,
      userNickname: nickname,
      userPhone: phone,
      userAddress: address,
      userEmail: email,
      userBirth: birth,
      userTransactionCount: transactionCount,
      userProfileImage: profileImage,
    };

    fetch("http://localhost:3001/signin", { 
      method: "post", 
      headers: {      
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.isSuccess === "True") {
          alert('회원가입이 완료되었습니다!')
          props.setMode("LOGIN");

        } else if (json.isSuccess === "이미 존재하는 닉네임 입니다!") { // 닉네임 중복 체크 추가
          setNicknameError(json.isSuccess);
            
        } else if (json.isSuccess === "이미 존재하는 아이디 입니다!") {
          setIdError(json.isSuccess);

        
        } else {
          alert(json.isSuccess)
        }
      });
  };

  return (
    <>
      <h2>회원가입</h2>

      <div className="form">
      <p><input className="login" type="text" placeholder="아이디" onChange={event => setId(event.target.value)} /></p>
        <p style={{ color: "red" }}>{idError}</p>
        <p><input className="login" type="password" placeholder="비밀번호" onChange={event => setPassword(event.target.value)} /></p>
        <p><input className="login" type="password" placeholder="비밀번호 확인" onChange={event => setPasswordConfirm(event.target.value)} /></p>
        <p style={{ color: "red" }}>{passwordError}</p>

        <p><input className="login" type="text" placeholder="이름" onChange={event => setName(event.target.value)} /></p>
        
        <p><input className="login" type="text" placeholder="닉네임" onChange={event => setNickname(event.target.value)} /></p>
        <p style={{ color: "red" }}>{nicknameError}</p>

        <p><input className="login" type="text" placeholder="휴대폰 번호" onChange={event => setPhone(event.target.value)} /></p>
        <p><input className="login" type="text" placeholder="주소" onChange={event => setAddress(event.target.value)} /></p>
        <p><input className="login" type="email" placeholder="이메일" onChange={event => setEmail(event.target.value)} /></p>
        
        <p><input className="login" type="date" placeholder="생년월일" onChange={event => setBirth(event.target.value)} /></p>
        <p style={{ color: "red" }}>{birthError}</p>
        <p><input className="login" type="number" placeholder="거래 횟수" onChange={event => setTransactionCount(event.target.value)} /></p>
        <p><input className="login" type="file" placeholder="프로필 이미지" onChange={event => setProfileImage(event.target.value)} /></p>
        
        <p><input className="btn" type="submit" value="회원가입" onClick={handleSignUp} /></p>
      </div>

    </> 
  );
}

export default Signin;
