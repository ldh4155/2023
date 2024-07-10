import { useState } from "react";
import { api } from "../../api/api";

const FindId = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [findId, setFindId] = useState("");

    const handleFindId = async(e) => {
        e.preventDefault();
        
        try {
            const response = await api.post(`findid`, {name,email});

            if(response.status === 200) {
                setFindId(response.data);
            } else {
                alert("일치하는 회원이 없습니다. 이름과 이메일을 다시 확인해주세요.")
            }
        } catch (error) {
            alert("일치하는 회원이 없습니다. 이름과 이메일을 다시 확인해주세요.")
        }
        
    }
    return (
        <div>
            <form onSubmit={handleFindId}>
                <input type="text" value={name} placeholder="가입한 이름" onChange={(e) => setName(e.target.value)}/>
                <input type="email" value={email} placeholder="회원가입에 작성한 이메일" onChange={(e) => setEmail(e.target.value)}/> 
                <button type="submit">아이디 찾기</button>
            </form>
            <p>회원님의 아이디는 {findId} 입니다</p>
        </div>
    );
}
export default FindId;