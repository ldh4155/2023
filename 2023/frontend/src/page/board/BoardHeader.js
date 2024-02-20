import react from "react";
import { Link } from "react-router-dom";

export default function BoardHeader() {
  return (
    <div className="left-padding">
      <Link to="/board">글 목록</Link>
      <br />
      <Link to="/board/write">글 쓰기</Link>
      <hr />
    </div>
  );
}
