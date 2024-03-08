import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "../../components/Comment";

export default function BoardDetail(props) {
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${id}`)
      .then((res) => {
        setBoardData(res.data);
        console.log(boardData.content);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.post(`http://localhost:8080/board/${id}/views`)
      .catch((error) => {
        console.log(error);
      });
  }, [id,setBoardData]);

  function DeleteBoard(id) {
    axios
      .delete(`http://localhost:8080/board/${id}`)
      .then((res) => {
        if (res.data === "ok") {
          alert("삭제 되었습니다.");
          navigate("/");
        } else {
          alert("삭제 실패했습니다");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function UpdateBoard(id) {
    navigate("/Update/" + id);
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
          </h1>
          <hr />
            <h3>내용 : {boardData.content}</h3>
            <h5>조회수 : {boardData.view}</h5>
            <h5>작성시간 : {boardData.time}</h5>
          </div>
            <Comment boardId={id} comments={boardData.comments}/>
      </>
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}