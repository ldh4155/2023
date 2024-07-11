import ImageList from "../../components/ImageList";
import BoardList from "./BoardList";
import styles from "./ModalBasic.module.css";
import Draggable from "react-draggable";

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
