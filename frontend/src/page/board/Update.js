import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BoardInput from "../../components/BoardInput";
import { api } from "../../api/api";

export default function Update(props) {
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const [boardData, setBoardData] = useState({
    title: "",
    content: "",
    files: [],
    originalFileNames: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`board/${id}`)
      .then((res) => {
        setBoardData({
          title: res.data.title,
          content: res.data.content,
          files: res.data.imageUrls,
          originalFileNames: res.data.originalFileName,
        });

        console.log(boardData);
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

    const formData = new FormData();
    formData.append("title", boardData.title);
    formData.append("content", boardData.content);
    if (boardData.files) {
      boardData.files.forEach((file) => formData.append("files", file));
    }
    api
      .put(`board/${id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("게시글 수정이 완료 되었습니다.");
          navigate(`/board/${id}`);
        } else {
          console.log("여기");
          alert("게시글 수정 실패1.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("게시글 수정 실패2.");
      });
  }
  function handleFileChange(event) {
    setBoardData({
      ...boardData,
      files: Array.from(event.target.files),
    });
  }

  // 기존 파일 정보를 보여주는 컴포넌트
  const ExistingFiles = ({ files, onRemove }) => (
    <ul>
      {files &&
        files.map((file, index) => (
          <li key={index}>
            {boardData.originalFileNames[index]}{" "}
            <button onClick={() => onRemove(index)}>삭제</button>
          </li>
        ))}
    </ul>
  );

  function handleFileChange(event) {
    // 새로 추가된 파일들을 현재 state에 추가
    const newFiles = Array.from(event.target.files);
    setBoardData({
      ...boardData,
      files: [...boardData.files, ...newFiles],
    });
    console.log(boardData);
  }

  function handleRemoveFile(index) {
    // 특정 인덱스의 파일을 삭제
    const updatedFiles = boardData.files.filter((_, i) => i !== index);
    setBoardData({
      ...boardData,
      files: updatedFiles,
    });
    console.log(boardData);
  }

  return (
    <div>
      <BoardInput
        SubmitBoard={SubmitBoard}
        boardData={boardData}
        ChangeValue={ChangeValue}
        handleFileChange={handleFileChange}
      />
      <ExistingFiles files={boardData.files} onRemove={handleRemoveFile} />
    </div>
  );
}
