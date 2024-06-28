import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/Action/modalAction';
import Message from "../page/message/Message";
import MessageForm from "../page/message/MessageForm";
import styles from '../style/cssmodule/components/MessageModal.module.css';

const MessageModal = () => {

    const [isClick, setIsClick] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 650, y: -425 });
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
          className={styles.modalContainer} onMouseDown={startDragging}
          style={{ top: `calc(50% + ${position.y}px)`,
              left: `calc(50% + ${position.x}px)`, position: 'absolute' }}>
          <div className={styles.modalHeader}>
              <button onClick={() => setIsClick(true)}>보관함</button>
              <button onClick={() => setIsClick(false)}>쪽지 작성하기</button>
          </div>
          {isClick ? (
              <div className={styles.messageContainer}>
                  <Message/>
              </div>
          ) : (
              <div className={styles.messageForm}>
                  <MessageForm/>
              </div>
          )}
          <button onClick={() => dispatch(closeModal())} className={styles.closeButton}>닫기</button>
      </div>
  );
};

export default MessageModal;