import React, { useEffect } from "react";
import BoardItem from "./BoardItem";
import { useState } from "react";
import BoardHeader from "./BoardHeader";
import Write from "./Write";
import BoardDetail from "./BoardDetail";
import Update from "./Update";
import { api, setAuthToken } from "../../api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../style/page.css";
import AreaFiltering from "../../components/AreaFiltering";

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);

  const fetchBoards = (page, term) => {
    setAuthToken();
    console.log("토큰:", localStorage.getItem("Authorization"));
    api
      .get(`board?page=${page}&size=10&keyword=${term || ""}`)
      .then((response) => {
        setBoards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      });
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => setCurrentPage(i)}>
        {i + 1}
      </button>
    );
  }

  const handleSearch = () => {
    fetchBoards(0, searchTerm);
  };

  const newBoard = (newBoard) => {
    setBoards([...boards, newBoard]);
  };
  return (
    <div>
      <AreaFiltering />
      <BoardHeader />
      {/* 중첩 라우팅  /board 가 기본적으로 붙음*/}
      <Routes>
        <Route
          path="write"
          element={<Write fetchBoards={() => fetchBoards(currentPage)} />}
        />{" "}
        // 글 쓰는 페이지
        <Route
          path=":id"
          element={<BoardDetail fetchBoards={() => fetchBoards(currentPage)} />} //글 삭제 후 새로고침 없이 확인
        />{" "}
        // 글 상세 보기
        <Route path="update/:id" element={<Update />} /> // 글 수정 하기
      </Routes>
      {boards.map((board) => (
        <BoardItem
          key={board.id}
          board={board}
          fetchBoards={() => fetchBoards(currentPage)}
        />
      ))}
      <div className="left-padding">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch}>검색</button>
        <br />
        <button onClick={previousPage}>이전</button>
        {pageNumbers}
        <button onClick={nextPage}>다음</button>
      </div>
    </div>
  );
}
