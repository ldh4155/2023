import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardInput from "../../components/BoardInput";
import {api, setAuthToken} from "../../api/api"

export default function Write(props) {
  let token = localStorage.getItem('token');
  const [board, setBoard] = useState({
    title: "",
    content: "",
    images: [], // 게시글에 이미지 정보를 포함
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
      images: Array.from(event.target.files),
    });
    console.log(board);
  }

  function SubmitBoard(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", board.title);
    formData.append("content", board.content);

    board.images.forEach((image) => formData.append("images", image));

    setAuthToken();
    api.post(`board`,formData)
      .then((data) => {
        console.log(data);
        alert("게시글 작성에 성공하였습니다.");
        navigate("/board");
      })
      .catch((error) => {
        alert("게시글 작성에 실패하였습니다.");
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
