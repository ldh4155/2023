
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Write from "./components/Write";
import BoardDetail from "./components/BoardDetail";
import Update from "./components/Update";
import setProxy from "./setProxy";
import BoardList from "./components/BoardList";
import BoardHeader from "./components/BoardHeader";

function App() {
  return (
    <div>
      <BrowserRouter>
        <BoardHeader />
        <Routes>
          <Route path="/board" element={<BoardList />} /> // 글 목록, 글 쓰기
          <Route path="/board/write" element={<Write />} /> // 글 쓰는 페이지
          <Route path="/board/:id" element={<BoardDetail />} /> // 글 상세 보기
          <Route path="/board/update/:id" element={<Update />} /> // 글 수정 하기
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
