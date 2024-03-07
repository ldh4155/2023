import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardInput from "../../components/BoardInput";

export default function Write(props) {
  const [board, setBoard] = useState({
    title: "",
    content: "",
    file: null, // 게시글에 이미지 정보를 포함
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
      file: event.target.files[0],
    });
    console.log(board);
  }

  function SubmitBoard(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "board",
      new Blob(
        [
          JSON.stringify({
            title: board.title,
            content: board.content,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    formData.append("file", board.file);

    fetch("http://localhost:8080/board", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //input 분리
  return (
    <BoardInput
      SubmitBoard={SubmitBoard}
      boardData={board}
      ChangeValue={ChangeValue}
      handleFileChange={handleFileChange}
    />
  );
}
