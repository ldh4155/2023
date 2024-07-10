import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import MessageDetail from "./MessageDetail";

const Message = () => {
  
  const [receiveMessages, setReceiveMessages] = useState([]);
  const [sendMessages, setSendMessages] = useState([]);

  const [clickState,setClickState] = useState('received');
  const [detail, setDetail] = useState(0);


  const handleClickState = (click) => {
    setClickState(click);
  }

  const clickDetail = (id) => {
    setDetail(id);
  }
  
  useEffect(() => {
      api.get(`/message/received`)
      .then((res) => { setReceiveMessages(res.data);})
      .catch((error) => { console.error(error);});

        
  }, [])

  useEffect(() => {
    if (clickState === 'sent') {
      api.get(`/message/sent`)
      .then((res) => { setSendMessages(res.data); })
      .catch((error) => { console.error(error); });
    }
  }, [clickState])

  if(detail !== 0) return (<MessageDetail id={detail} setDetail={setDetail} clickState={clickState}/>);

  return(
    <div>
      <h3>쪽지함</h3>
      <div><span onClick={() => handleClickState('received')}>받은 쪽지</span> | <span onClick={() => handleClickState('sent')}>보낸 쪽지</span></div>
        {clickState === 'received' ? (
          <>
            <div>보낸 사람 | 제목 | 날짜</div>
              {receiveMessages.length > 0 ? (
                receiveMessages.map(message => (
                  <div key={message.id} onClick={() => clickDetail(message.id)}>
                    {message.sendMember} | {message.title} | {message.sendTime}
                  </div>
                ))
              ) : (
            <div>받은 쪽지가 없습니다.</div>
            )}
          </>
        ) : (
        <>
        <div>받은 사람 | 제목 | 날짜</div>
          {sendMessages.length > 0 ? (
            sendMessages.map(message => (
              <div key={message.id} onClick={() => clickDetail(message.id)}>
                {message.receiveMember} | {message.title} | {message.sendTime}
              </div>
            ))
          ) : (
        <div>보낸 쪽지가 없습니다.</div>
        )}
      </>
      )} 
    </div>
    );
}

export default Message;