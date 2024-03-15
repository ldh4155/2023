import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState(null);
  const [transactionCount, setTransactionCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [birthError, setBirthError] = useState("");

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      setPasswordError('입력한 비밀번호가 같지 않습니다.');
      return;
    }

    if (birth === null) {
      setBirthError("생년월일은 필수 항목입니다.");
      return;
    }

    if (name === "") {
      setNameError("이름은 필수 항목입니다.");
      return;
    }

    if (id === "") {
      setIdError("아이디는 필수 항목입니다.");
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
          localStorage.setItem('token', json.token);
          alert('회원가입이 완료되었습니다!')
          props.setMode("LOGIN");
        } else if (json.isSuccess === "이미 존재하는 닉네임 입니다!") {
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
        <input type="text" placeholder="아이디" onChange={event => setId(event.target.value)}/>
        <p style={{color: "red"}}>{idError}</p>
        <input type="password" placeholder="비밀번호" onChange={event => setPassword(event.target.value)}/>
        <input type="password" placeholder="비밀번호 확인" onChange={event => setPasswordConfirm(event.target.value)}/>
        <p style={{color: "red"}}>{passwordError}</p>
        <input type="text" placeholder="이름" onChange={event => setName(event.target.value)}/>
        <p style={{color: "red"}}>{nameError}</p>
        <input type="text" placeholder="닉네임" onChange={event => setNickname(event.target.value)}/>
        <p style={{color: "red"}}>{nicknameError}</p>
        <input type="text" placeholder="휴대폰 번호" onChange={event => setPhone(parseInt(event.target.value))}/>/>
        <input type="text" placeholder="주소" onChange={event => setAddress(event.target.value)}/>
        <input type="email" placeholder="이메일" onChange={event => setEmail(event.target.value)}/>
        <input type="date" placeholder="생년월일" onChange={event => setBirth(new Date(event.target.value))}/>

        <p style={{color: "red"}}>{birthError}</p>
        <input type="number" placeholder="거래 횟수" onChange={event => setTransactionCount(parseInt(event.target.value))}/>
        <input type="file" placeholder="프로필 이미지" onChange={event => setProfileImage(event.target.value)}/>
        <input type="submit" value="회원가입" onClick={handleSignUp}/>
      </div>
    </>
  );
}

export default Signin;
