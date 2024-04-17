import React, { useEffect, useState } from "react";

import axios from "axios";
import { debounce } from 'lodash';
const SignUp = () => {
    
    const [member, setMember] = useState({
        memberId:'',
        password:'',
        name:'',
        nickName:'',
        phone:'',
        address:'',
        email:'',
        birth:''

    });
    
    const [idMessage, setIdMessage] = useState("");
    const [pwdMessage, setpwdMessage] = useState("");
    const [isButtonDisable,setIsButtonDisable] = useState(true);

    useEffect(() => {
        const isValid = member.memberId.trim() !== '' && member.password.trim() !== '' &&
                        member.name.trim() !== '' && member.nickName.trim() !== '' && 
                        member.phone.trim() !== '' && member.address.trim() !== '' && 
                        member.email.trim() !== '' && member.birth.trim() !== '';
        setIsButtonDisable(!isValid);
    }, [member.memberId, member.password, member.name, member.nickName, member.phone, member.address, member.email, member.birth]);
    
    //1초동안 입력 없는 경우 get 보내서 중복 체크
    const checkId = debounce(async (e) => {
        const memberId = e.target.value;

        //정규식 검사
        const regex = /^[a-zA-Z0-9]{4,10}$/;  // 예: 영문자와 숫자로 이루어진 4자 이상의 아이디
        if (!regex.test(memberId)) {
            setIdMessage("영문자와 숫자로 이루어진 4~10자이내");
            return;
        }
        //중복 체크
        try {
            const response = await axios.get(`http://localhost:8080/signup?id=${memberId}`)
            if(!response.data)
                setIdMessage("사용할 수 있는 아이디");
            else
                setIdMessage("사용할 수 없는 아이디");
        } catch (error) {

        }
    }, 1000);
    
    //비밀번호 일치 확인
    const checkPassword = (e) => {
        const inputpwd = e.target.value;

        if(member.password === inputpwd){
            setpwdMessage("비밀번호가 일치합니다");
        }else {
            setpwdMessage("비밀번호가 일치하지 않습니다.");
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            console.log(member);
            const response = await axios.post('http://localhost:8080/signup', member);
            console.log(response.data)
            if (response.data) {
                alert('가입에 성공하였습니다!');
                window.location.href = '/';
            } else {
                alert('가입에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Failed to sign up', error);
            alert('가입에 실패하였습니다. 다시 시도해주세요.');
        }
    }

    return (
      <>
        <h2>회원가입</h2>
        <div className="signUpForm">
          <input name="memberId" type="text" placeholder="아이디" onChange={(e) => {handleChange(e); checkId(e);}}/>
          <p style={{color: "red"}}>{idMessage}</p>
          <input name="password" type="password" placeholder="비밀번호" onChange={handleChange}/>
          <input type="password" placeholder="비밀번호 확인" onChange={checkPassword}/>
          <p style={{color: "red"}}>{pwdMessage}</p>
          <input name="name" type="text" placeholder="이름" onChange={handleChange}/>
          <input name="nickName" type="text" placeholder="닉네임" onChange={handleChange}/>
          <input name="phone" type="text" placeholder="휴대폰 번호" onChange={handleChange}/>
          <input name="address" type="text" placeholder="주소" onChange={handleChange}/>
          <input name="email" type="email" placeholder="이메일" onChange={handleChange}/>
          <input name="birth" type="date" placeholder="생년월일" onChange={handleChange}/>
          {isButtonDisable && <p style={{color: "red"}}>모두 입력해주세요</p>}
        </div>
        <input type="submit" className="submitButton" value="회원가입" disabled={isButtonDisable} onClick={handleSignUp}/>
      </>
  );

}
export default SignUp;