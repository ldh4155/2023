import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Update(props) {
  const { id } = useParams();
  const [boardData, setBoardData] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`)
      .then((res) => {
        setBoardData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function ChangeValue(event) {
    setBoardData({
      ...boardData,
      [event.target.name]: event.target.value,
    });
  }

  function SubmitBoard(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/board/${id}`, boardData)
      .then((res) => {
        if (res.status === 200) {
          alert("게시글 수정이 완료 되었습니다.");
          navigate(`/board/${id}`);
        } else {
          alert("게시글 수정 실패.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("게시글 수정 실패.");
      });
  }

  return (
    <form onSubmit={SubmitBoard}>
      <label>
        제목 :
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={boardData.title}
          onChange={ChangeValue}
        />
      </label>
      <br />
      <label>
        내용 :
        <textarea
          placeholder="Enter Content"
          name="content"
          value={boardData.content}
          onChange={ChangeValue}
        />
      </label>
      <br />
      <button type="submit">완료</button>
    </form>
  );
}
