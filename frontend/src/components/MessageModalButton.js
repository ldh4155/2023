import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/Action/modalAction';

const MessageModalButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(openModal())}>열기</button>
  );
};

export default MessageModalButton;