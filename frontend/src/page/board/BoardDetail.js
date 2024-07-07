import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageList from "../../components/ImageList";
import Comment from "../../components/Comment";
import { api } from "../../api/api";
import Modal from "../../components/Modal";
import ModalBoard from "./ModalBoard";
import BoardList from "./BoardList";

export default function BoardDetail(props) {
  const token = localStorage.getItem("token");
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(null);
  const [modalBoard, setModalBoard] = useState({});

  useEffect(() => {
    api
      .get(`board/${id}`)
      .then((res) => {
        setBoardData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div>
      {boardData ? (
        <>
          <div>
            <h1>
              제목 : {boardData.title}{" "}
              <button onClick={() => UpdateBoard(boardData.id)}>수정</button>{" "}
              <button onClick={() => DeleteBoard(boardData.id)}>삭제</button>
              <Modal boardData={boardData} />
            </h1>
            <hr />
            <h3>내용 : {boardData.content}</h3>
            <ImageList imageUrls={boardData.imageUrls} />
            <h5>작성자 : {boardData.nickName}</h5>
            <h5>조회수 : {boardData.view}</h5>
            <h5>작성시간 : {boardData.time}</h5>
          </div>
          <Comment boardId={id} comments={boardData.comments} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
