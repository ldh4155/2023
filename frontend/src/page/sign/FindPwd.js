import { useState } from "react";
import { api } from "../../api/api";

const FindPwd = () => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const handleFindPwd = async(e) => {
        e.preventDefault();
        
        try {
            const response = await api.post(`findpwd`, {id,name});

            if(response.status === 200) {
                alert("이메일로 임시 비밀번호가 발송되었습니다.")
            } else {
                alert("일치하는 회원이 없습니다. 이름과 아이디를 다시 확인해주세요.")
            }
        } catch (error) {
            alert("일치하는 회원이 없습니다. 이름과 아이디를 다시 확인해주세요.")
        }
        
    }
    return (
        <div>
            <p>임시 비밀번호를 가입하신 이메일로 보내드립니다.</p>
            <form onSubmit={handleFindPwd}>
                <input type="text" value={name} placeholder="가입한 이름" onChange={(e) => setName(e.target.value)}/>
                <input type="text" value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)}/> 
                <button type="submit">임시 비밀번호 발급</button>
            </form>
        </div>
    );
}
export default FindPwd;