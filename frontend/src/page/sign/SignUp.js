import { useState } from "react";
import axios from "axios";
import { debounce } from 'lodash';
const SignUp = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [idMessage, setIdMessage] = useState("");

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
        setId(value);
        checkId(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>id<input type="text" required={true} value={id} onChange={changeId}></input></p>
                <p>{idMessage}</p>
                <button type="submit">가입</button>
            </form>
        </div>
    )

}
export default SignUp;