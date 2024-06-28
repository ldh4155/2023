import { useState } from "react";
import ModalBoard from "../page/board/ModalBoard";
import styles from '../style/cssmodule/components/Modal.module.css';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastNotification({ boardData }) {
    const [showToast, setShowToast] = useState(false);
    const [toastBoard, setToastBoard] = useState(boardData);

    function toggleToast() {
        setShowToast(!showToast);
        if (!showToast) {
            setToastBoard(boardData);
        }
    }

    return (
        <div>
            <button onClick={toggleToast} className={styles.buttonStyle}>
                작은 창으로 보기
            </button>
            <ToastContainer
                position="top-end"
                className={`p-3 ${styles.customToast}`}
            >
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={10000}
                    autohide
                    className={styles.customDialog}
                >
                    <Toast.Header className={styles.ToastHeaderCustom}>
                        <strong className="me-auto">게시글</strong>
                    </Toast.Header>
                    <Toast.Body className={styles.ToastBodyCustom}>
                        <ModalBoard boardData={toastBoard} />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default ToastNotification;
