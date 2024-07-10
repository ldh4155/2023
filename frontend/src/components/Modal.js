import { useState } from "react";
import ModalBoard from "../page/board/ModalBoard";
import Draggable from "react-draggable";
import BoardList from "../page/board/BoardList";

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
      {isModal === true ? (
        <Draggable>
          <div>
            <ModalBoard boardData={modalBoard} />
          </div>
        </Draggable>
      ) : null}
    </div>
  );
}
export default Modal;
