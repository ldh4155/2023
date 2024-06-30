import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardInput from "../../components/BoardInput";
import { api } from "../../api/api";

export default function Update(props) {
    let token = localStorage.getItem("token");
    const { id } = useParams();
    const [boardData, setBoardData] = useState({
        title: "",
        content: "",
        files: [],
        category: "", // 카테고리 추가
    });
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get(`board/${id}`)
            .then((res) => {
                setBoardData({
                    title: res.data.title,
                    content: res.data.content,
                    files: res.data.imageUrls,
                    category: res.data.category, // 카테고리 추가
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function ChangeValue(event) {
        setBoardData({
            ...boardData,
            [event.target.name]: event.target.value,
        });
        console.log(boardData);
    }

    function SubmitBoard(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", boardData.title);
        formData.append("content", boardData.content);
        formData.append("category", boardData.category); // 카테고리 추가
        boardData.files.forEach((file) => formData.append("files", file));
        api
            .put(`board/${id}`, formData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("여기");
                    console.log(boardData);
                    alert("게시글 수정이 완료 되었습니다.");
                    navigate(`/board/${id}`);
                } else {
                    console.log("여기");
                    alert("게시글 수정 실패1.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 수정 실패2.");
            });
    }

    function handleFileChange(event) {
        const newFiles = Array.from(event.target.files);
        setBoardData({
            ...boardData,
            files: [...boardData.files, ...newFiles],
        });
        console.log(boardData);
    }

    return (
        <div>
            <BoardInput
                SubmitBoard={SubmitBoard}
                boardData={boardData}
                ChangeValue={ChangeValue}
                handleFileChange={handleFileChange}
            />
        </div>
    );
}
