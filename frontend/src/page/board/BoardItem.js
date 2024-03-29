import { Link } from "react-router-dom";

export default function BoardItem(props) {
  const { id, title, content, view, createTime, modifiedTime } = props.board;

  return (
    <div>
      <div>
        <h3>제목 : {title}</h3>
        <Link to={"/board/" + id}>상세 보기</Link>
      </div>
    </div>
  );
}
