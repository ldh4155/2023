import { Link } from "react-router-dom";

export default function BoardItem(props) {
  const { id, title, content, view, createTime, modifiedTime, category } = props.board;

  return (
    <div>
      <div>
        <h3>제목 : {title}</h3>
        <p>카테고리: {category}</p>
        <Link to={"/board/" + id}>상세 보기</Link>
      </div>
    </div>
  );
}
