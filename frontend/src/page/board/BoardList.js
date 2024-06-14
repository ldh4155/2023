import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import BoardHeader from "./BoardHeader";
import Write from "./Write";
import BoardDetail from "./BoardDetail";
import Update from "./Update";
import { api } from "../../api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../style/page.css";
import AreaFiltering from "../../components/AreaFiltering";

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAreas, setSelectedAreas] = useState({
    province: "",
    citys: [],
  });
  const [category, setCategory] = useState(""); // 카테고리 상태 추가

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedAreas.citys.length > 0 || category) {
      filterBoards();
    } else {
      fetchBoards(currentPage);
    }
  }, [selectedAreas, category]); // 카테고리 상태 감시 추가

  const fetchBoards = (page, term) => {
    api
      .get(`board?page=${page}&size=10&keyword=${term || ""}`)
      .then((response) => {
        setBoards(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  };

  const filterBoards = () => {
    const params = new URLSearchParams();

    if (selectedAreas.citys.length > 0) {
      selectedAreas.citys.forEach(city => params.append('cities', city));

      while (params.getAll('cities').length < 5) {
        params.append('cities', null);
      }
    }

    if (category) {
      params.append('category', category); // 카테고리 추가
    }

    api
      .get(`board/filter`, { params })
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.error("Error filtering boards:", error);
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

  const handleAreaChange = (areas) => {
    setSelectedAreas(areas);
  };

  return (
    <div>
      <AreaFiltering onAreaChange={handleAreaChange} />
      <BoardHeader />
      <div>
        <label>
          카테고리:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">모든 카테고리</option>
            <option value="전자제품">전자제품</option>
            <option value="식품">식품</option>
            <option value="의류">의류</option>
            <option value="기타">기타</option>
          </select>
        </label>
      </div>
      <Routes>
        <Route
          path="write"
          element={<Write fetchBoards={() => fetchBoards(currentPage)} />}
        />
        <Route
          path=":id"
          element={<BoardDetail fetchBoards={() => fetchBoards(currentPage)} />}
        />
        <Route path="update/:id" element={<Update />} />
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
