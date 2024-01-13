import react from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">글 목록</Link>
      <br />
      <br />
      <Link to="/write">글 쓰기</Link>
      <hr />
    </div>
  );
}
