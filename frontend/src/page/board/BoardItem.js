import { Link } from "react-router-dom";

export default function BoardItem(props) {
  const { id, title, content, view, createTime, modifiedTime } = props.board;

  return (
    <div>
      <div>
        <Link to={"/board/" + id}>
          <h3>제목 : {title}</h3>
        </Link>
        <hr />
      </div>
    </div>
  );
}
