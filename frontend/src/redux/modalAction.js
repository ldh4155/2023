//action 생성자 정의
import { OPEN_MODAL, CLOSE_MODAL } from './ActionType';

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});