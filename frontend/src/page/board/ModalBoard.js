import ImageList from "../../components/ImageList";
import styles from "./ModalBasic.module.css";

function ModalBoard({ boardData, setIsModal, setModalBoard }) {
  return (
    <div className={styles.container}>
      {boardData ? (
        <div>
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
