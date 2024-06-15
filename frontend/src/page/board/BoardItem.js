import { Link } from "react-router-dom";

export default function BoardItem(props) {
  const { id, title, category, content, view, createTime, modifiedTime } = props.board;

  return (
    <div>
      <div>
        <h7>카테고리 : {category}</h7>
        <Link to={"/board/" + id}>
          <h3>제목 : {title}</h3>
        </Link>
        <hr />
      </div>
    </div>
  );
}
