import { useState } from "react";
import { api } from "../../api/api";
import styles from "../../style/cssmodule/sign/FindPwd.module.css";


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
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>임시 비밀번호 발급</h2>
                <form onSubmit={handleFindPwd}>
                    <input
                        type="text"
                        value={name}
                        placeholder="가입한 이름"
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        value={id}
                        placeholder="아이디"
                        onChange={(e) => setId(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        임시 비밀번호 발급
                    </button>
                </form>
            </div>
        </div>
    );


}
export default FindPwd;