import React, { useEffect } from "react";
import BoardItem from "./BoardItem";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBoards(currentPage);
  }, []);

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);

  const fetchBoards = (page, term) => {
    axios
      .get(
        `http://localhost:8080/board?page=${page}&size=10&keyword=${term || ""}`
      )
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

  return (
    <div>
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
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
  );
}
