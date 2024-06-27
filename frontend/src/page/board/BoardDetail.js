import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageList from "../../components/ImageList";
import Comment from "../comment/Comment";
import { api } from "../../api/api";
import {decodeJwt} from "../../api/decodeJwt";
import Modal from "../../components/Modal";
import ModalBoard from "./ModalBoard";
import BoardList from "./BoardList";
import styles from '../../style/cssmodule/Board/BoardDetail.module.css';

export default function BoardDetail(props) {
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(null);
  const [modalBoard, setModalBoard] = useState({});
  const myId = decodeJwt();

  const fetchBoardData = () => {
    api
        .get(`board/${id}`)
        .then((res) => {
          setBoardData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  function DeleteBoard(id) {
    api
        .delete(`board/${id}`)
        .then((res) => {
          if (res.data === "ok") {
            alert("삭제 되었습니다.");
            props.fetchBoards(); //새로고침 없이 삭제 확인
            navigate("/board");
          } else {
            alert("삭제 실패했습니다");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  function UpdateBoard(id) {
    navigate("/board/Update/" + id);
  }

    return (
        <div className={styles.container}>
            {boardData ? (
                <>
                    <div>
                        <h1 className={styles.title}>
                            제목 : {boardData.title}{" "}
                            {boardData.memberId === myId && (
                                <>
                                    <button className={styles.button} onClick={() => UpdateBoard(boardData.id)}>수정</button>
                                    {" "}
                                    <button className={styles.button} onClick={() => DeleteBoard(boardData.id)}>삭제</button>
                                </>
                            )}
                            <Modal boardData={boardData}/>
                        </h1>
                        <hr/>
                        <h3 className={styles.content}>내용 : {boardData.content}</h3>
                        <h4 className={styles.category}>카테고리 : {boardData.category}</h4>
                        <ImageList className={styles.imageList} imageUrls={boardData.imageUrls}/>
                        <h5 className={styles.stats}>조회수 : {boardData.view}</h5>
                        <h5 className={styles.stats}>작성시간 : {boardData.time}</h5>
                    </div>
                    <Comment boardId={id} comments={boardData.comments} onCommentUpdate={fetchBoardData} />
                </>
            ) : (
                <p className={styles.loading}>Loading...</p>
            )}
        </div>
    );
}