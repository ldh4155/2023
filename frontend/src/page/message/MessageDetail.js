import { useEffect, useState } from "react";
import { api } from "../../api/api";

const MessageDetail = ({id, setDetail, clickState}) => {

    const [messageDetail, setMessageDetail] = useState(null);

    useEffect(() => {
        api.get(`message/${id}`)
        .then((res) => { setMessageDetail(res.data)})
        .catch((error) => {console.error(error)})
    }, [])

    const deleteMessage = async () => {
        await api.delete(`message/${clickState}/${id}`)
        .then((res) => { if(res.status === 200)
          alert("삭제성공")
          setDetail(0)
        })
        .catch((error) => {
            alert("삭제 실패")
            console.error(error)})
    }

    if(messageDetail === null) return ( <div>Loading...</div>);
    return (
        <div>
            <h5>제목:{messageDetail.title}</h5>
            <span>보낸사람:{messageDetail.sendMember}</span>&nbsp;
            <span>받는사람:{messageDetail.receiveMember}</span>&nbsp;
            <span>보낸시간:{messageDetail.sendTime}</span>
            <br/>
            <p>내용:{messageDetail.text}</p>
            <button onClick={() => setDetail(0)}>목록</button>
            <button onClick={() => deleteMessage()}>삭제</button>
        </div>
    );
}

export default MessageDetail;