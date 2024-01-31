import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardInput from "../../components/BoardInput";

export default function Write(props) {
  const [board, setBoard] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  function ChangeValue(event) {
    setBoard({
      ...board,
      [event.target.name]: event.target.value,
    });
  }

  function SubmitBoard(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/board", board)
      .then((res) => {
        if (res.status === 201) {
          alert("게시글 작성이 완료 되었습니다.");
          navigate("/");
        } else {
          alert("게시글 등록 실패.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("게시글 등록 실패.");
      });
  }

  //   fetch("http://localhost:8080/board", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(board),
  //   })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         return res.json();
  //       } else {
  //         return null;
  //       }
  //     })
  //     .then((res) => {
  //       if (res !== null) {
  //         alert("게시글 작성이 완료 되었습니다.");
  //         navigate("/");
  //       } else {
  //         alert("게시글 등록 실패.");
  //       }
  //     });
  // }

  //input 분리
  return (
    <BoardInput
      SubmitBoard={SubmitBoard}
      boardData={board}
      ChangeValue={ChangeValue}
    />
  );
}
