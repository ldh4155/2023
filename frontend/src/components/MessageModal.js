import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/modalAction';
import Message from "../page/message/Message";
import MessageForm from "../page/message/MessageForm";

const MessageModal = () => {
  
  const [isClick, setIsClick] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const isOpen = useSelector(state => state.modal.isModalOpen);
  const dispatch = useDispatch();

   // 드래그 시작 핸들러
   const startDragging = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 드래그 종료 핸들러
  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onDragging = (e) => {
        if (isDragging) {
          setPosition({
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y,
          });
        }
      };
    
      if (isDragging) {
        window.addEventListener('mousemove', onDragging);
        window.addEventListener('mouseup', stopDragging);
      }
  
      return () => {
        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', stopDragging);
      };
    }, [isDragging, stopDragging, startPos.x, startPos.y]);

  if (!isOpen) return null;

  return (
    <div 
      className="modalContainer" onMouseDown={startDragging}
      style={{ top: `calc(50% + ${position.y}px)`,
      left: `calc(50% + ${position.x}px)`, position: 'absolute' }}>
      <button onClick={() => setIsClick(true)}>보관함</button>
      <button onClick={() => setIsClick(false)}>쪽지 작성하기</button>
      {isClick ? (
        <Message/>
      ) : (
        <MessageForm/>
      )}

      <button onClick={() => dispatch(closeModal())}>닫기</button>
    </div>
  );
 };

export default MessageModal;