import { useState } from "react";
import ModalBoard from "../page/board/ModalBoard";
import styles from "../style/cssmodule/components/Modal.module.css";
import { Modal } from "react-bootstrap";
import Draggable from "react-draggable";

function IsModal({ boardData }) {
  const [showModal, setShowModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(boardData);
  const [buttonText, setButtonText] = useState("모달로 보기");

  function toggleModal() {
    setShowModal(!showModal);
    setButtonText("모달로 보기");
    if (!showModal) {
      setModalBoard(boardData);

      setButtonText("모달 닫기");
    }
  }

  return (
    <div>
      <button onClick={toggleModal} className={styles.buttonStyle}>
        {buttonText}
      </button>
      {showModal === true ? (
        <Draggable>
          <div>
            <Modal.Body className={styles.ToastBodyCustom}>
              <ModalBoard boardData={modalBoard} togglModal={toggleModal} />
            </Modal.Body>
          </div>
        </Draggable>
      ) : null}
    </div>
  );
}

export default IsModal;
