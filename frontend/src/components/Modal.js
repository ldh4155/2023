import { useState } from "react";
import ModalBoard from "../page/board/ModalBoard";

function Modal({ boardData }) {
  const [isModal, setIsModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(boardData);

  function toggleModal() {
    setIsModal(!isModal);
    if (isModal) {
      setModalBoard(boardData);
    }
  }

  return (
    <div>
      <button onClick={toggleModal}>모달</button>
      {isModal === true ? <ModalBoard boardData={modalBoard} /> : null}
    </div>
  );
}
export default Modal;
