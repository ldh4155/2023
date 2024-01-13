import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Write from "./components/Write";
import BoardDetail from "./components/BoardDetail";
import Update from "./components/Update";
import setProxy from "./setProxy";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> // 글 목록, 글 쓰기
          <Route path="/write" element={<Write />} /> // 글 쓰는 페이지
          <Route path="/board/:id" element={<BoardDetail />} /> // 글 상세 보기
          <Route path="/update/:id" element={<Update />} /> // 글 수정하기
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
