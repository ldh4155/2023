import { useState } from "react";
import ModalBoard from "../page/board/ModalBoard";
import styles from '../style/cssmodule/components/Modal.module.css';
import { Modal } from 'react-bootstrap';

function ToastNotification({ boardData }) {
    const [showModal, setShowModal] = useState(false);
    const [modalBoard, setModalBoard] = useState(boardData);

    function toggleModal() {
        setShowModal(!showModal);
        if (!showModal) {
            setModalBoard(boardData);
        }
    }

    return (
        <div>
            <button onClick={toggleModal} className={styles.buttonStyle}>
                작은 창으로 보기
            </button>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                className={styles.customDialog}
            >
                <Modal.Header closeButton className={styles.ToastHeaderCustom}>
                    <Modal.Title>게시글</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.ToastBodyCustom}>
                    <ModalBoard boardData={modalBoard} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ToastNotification;
