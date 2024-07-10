import { useState } from "react";
import { api } from "../../api/api";
import styles from '../../style/cssmodule/sign/FindId.module.css';


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
        <div className={styles['find-id-container']}>
            <div className={styles['find-id-form']}>
                <h2>아이디 찾기</h2>
                <form onSubmit={handleFindId}>
                    <input
                        type="text"
                        value={name}
                        placeholder="가입한 이름"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="회원가입에 작성한 이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className={styles['find-id-button']}>
                        아이디 찾기
                    </button>
                    <div className={styles['find-id-result']}>
                        <p>회원님의 아이디는 {findId} 입니다</p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default FindId;