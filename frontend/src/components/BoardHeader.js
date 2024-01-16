import react from "react";
import { Link } from "react-router-dom";

export default function BoardHeader() {
  return (
    <div>
      <Link to="/">글 목록</Link>
      <br />
      <Link to="/write">글 쓰기</Link>
      <hr />
    </div>
  );
}
