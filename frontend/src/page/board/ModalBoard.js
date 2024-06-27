import ImageList from "../../components/ImageList";
import styles from '../../style/cssmodule/Board/modalBoard.module.css';

function ModalBoard({ boardData, setIsModal, setModalBoard }) {
  return (
      <div className={styles.container}>
        {boardData ? (
            <div className={styles.modalContent}>
              <h1 className={styles.title}>제목 : {boardData.title}</h1>
              <div className={styles.hr}></div>
              <h3 className={styles.content}>내용 : {boardData.content}</h3>
              <ImageList imageUrls={boardData.imageUrls} />
            </div>
        ) : (
            <></>
        )}
      </div>
  );
}
export default ModalBoard;
