import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../style/cssmodule/Board/BoardHeader.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 추가

export default function BoardHeader() {
    const [isVisible, setIsVisible] = useState(false); // 상태 추가

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={styles.container1}>
        <div>
            <Dropdown show={isVisible} onToggle={handleToggle} className={styles.leftPadding}>
                <Dropdown.Toggle variant="danger" id="dropdown-basic" className={styles.Button}>
                    {isVisible ? "메뉴 숨기기" : "메뉴 보기"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/board">글 목록</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/board/write">글 쓰기</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
    );
}
