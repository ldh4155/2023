import { Link } from "react-router-dom";
import styles from '../../style/cssmodule/Board/BoardItem.module.css';
export default function BoardItem(props) {
  const { id, title,category, content, view, createTime, modifiedTime } = props.board;

    return (
        <div className={styles.listItem}>
            <h7>카테고리 : {category}</h7>
            <Link to={"/board/" + id} className={styles.link}>
                <h3 className={styles.title}>제목 : {title}</h3>
            </Link>
            <hr className={styles.hr} />
        </div>
    );
}
