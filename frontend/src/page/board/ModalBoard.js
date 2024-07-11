import ImageList from "../../components/ImageList";
import styles from '../../style/cssmodule/Board/ModalBasic.module.css'



function ModalBoard({ boardData, togglModal }) {
  return (
    <div className={styles.container}>
      {boardData ? (
        <div>
          <button className={styles.close} onClick={togglModal}>
            {" "}
            x{" "}
          </button>
          <h1>제목 : {boardData.title}</h1>
          <hr />
          <h3>내용 : {boardData.content}</h3>
          <ImageList imageUrls={boardData.imageUrls} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ModalBoard;
