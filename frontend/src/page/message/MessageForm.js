import { useState } from "react";
import { api } from "../../api/api";

const MessageForm = () => {

    const [message, setMessage] = useState({
        title : "",
        text : "",
        receiveMember : ""
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
           await api.post(`/message/write`, message)
            .then((res) => { if(res.status === 201) {
                alert("쪽지 보내기 성공")
                setMessage({
                  title : "",
                  text : "",
                  receiveMember : ""});
            }})
        } catch(error) {
            alert("쪽지 보내기 실패")
            console.error(error);
        }
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
              <label>
                제목:
                <input
                  type="text"
                  placeholder="제목"
                  name="title"
                  value={message.title}
                  onChange={(e) => setMessage({...message, title : e.target.value})}
                />
              </label>
              <label>
                받는 사람:
                <input
                  type="text"
                  placeholder="닉네임"
                  name="receiveMember"
                  value={message.receiveMember}
                  onChange={(e) => setMessage({...message, receiveMember : e.target.value})}
                />
              </label>
              <br />
              <label>
                내용:
                <textarea
                  placeholder="Enter text"
                  name="text"
                  value={message.text}
                  onChange={(e) => setMessage({...message, text : e.target.value})}
                />
               </label>
              <br />
        
              <button type="submit">완료</button>
            </form>
        </div>
    );
}

export default MessageForm;