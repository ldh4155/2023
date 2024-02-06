import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from 'lodash';
const SignUp = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [idMessage, setIdMessage] = useState("");
    const [member, setMember] = useState();
    useEffect(() => {
        const fetchMemberStructure = async () => {
            try {
                const response = await axios.get('http://localhost:8080/memberStructure');
                setMember(response.data);
            } catch (error) {
                console.error('Failed to fetch member structure', error);
            }
        };
    
        fetchMemberStructure();
    }, []);

    //1초동안 입력 없는 경우 get 보내서 중복 체크
    const checkId = debounce(async (id) => {
        //정규식 검사
        const regex = /^[a-zA-Z0-9]{4,10}$/;  // 예: 영문자와 숫자로 이루어진 4자 이상의 아이디
        if (!regex.test(id)) {
            setIdMessage("영문자와 숫자로 이루어진 4~10자이내");
            return;
        }
        //중복 체크
        try {
            const response = await axios.get(`http://localhost:8080/signup?id=${id}`)
            if(!response.data)
                setIdMessage("사용할 수 있는 아이디");
            else
                setIdMessage("사용할 수 없는 아이디");
        } catch (error) {

        }
    }, 1000);

    const changeId = (e) => {
        const {value} = e.target;
        setMember(prevMember => ({ ...prevMember, id: value }));
        checkId(value);
    };
    
    const changePassword = (e) => {
        const {value} = e.target;
        setMember(prevMember => ({ ...prevMember, password: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signup', member);
            if (response.data.success) {
                alert('가입에 성공하였습니다!');
            } else {
                alert('가입에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Failed to sign up', error);
            alert('가입에 실패하였습니다. 다시 시도해주세요.');
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>id<input type="text" required={true} value={id} onChange={changeId}></input></p>
                <p>{idMessage}</p>
                <p>password<input type="text" required={true} value={password} onChange={changePassword}></input></p>
                <button type="submit">가입</button>
            </form>
        </div>
    )

}
export default SignUp;