import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardInput from "../../components/BoardInput";
import { api } from "../../api/api";
import BoardList from "./BoardList";



export default function Write(props) {
  const [board, setBoard] = useState({
    title: "",
    content: "",
    files: [],
    category: "",
  });

  const navigate = useNavigate();

  function ChangeValue(event) {
    setBoard({
      ...board,
      [event.target.name]: event.target.value,
    });
    console.log(board);
  }

  function handleFileChange(event) {
    setBoard({
      ...board,
      files: Array.from(event.target.files),
    });
    console.log(board);
  }

  function SubmitBoard(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", board.title);
    formData.append("content", board.content);
    formData.append("category", board.category);

    board.files.forEach((file) => formData.append("files", file));
    api.post(`board`,formData)

      .then((data) => {
        console.log(data);
        alert("게시글 작성에 성공하였습니다.");
        props.fetchBoards();
        navigate("/board");
      })
      .catch((error) => {
        if (error.code == "ERR_BAD_REQUEST") {
          alert("사진(jpg, png, gif), 동영상(mp4, avi, mov)만 가능합니다.");
        } else {
          alert("게시글 작성에 실패하였습니다.");
        }
      });
  }

  //input 분리
  return (
    <BoardInput
      SubmitBoard={SubmitBoard}
      boardData={board}
      ChangeValue={ChangeValue}
      handleFileChange={handleFileChange}
      newBoard={props.newBoard}

    />
  );
}
