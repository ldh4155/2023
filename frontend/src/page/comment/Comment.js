import React, { useState, useEffect, useReducer } from 'react';
import CommentWrite from "./CommentWrite";
import { api } from "../../api/api";
import {decodeJwt} from "../../api/decodeJwt";
import styles from "../../style/cssmodule/Comment/Comment.module.css";

const Comment = ({ boardId, comments, onCommentUpdate}) => {

    const [commentList, setCommentList] = useState(comments);
    const [visible, setVisible] = useState(10);
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState({
        id: null,
        content: ""
    });

    const myId = decodeJwt();

    useEffect(() => {
        setCommentList(comments);
    }, [comments]);

    const showMore = () => {
        setVisible((prevValue) => prevValue + 10);
    };

    const deleteComment = async (id) => {
        try {
            await api.delete(`board/${boardId}/comment/${id}`);
            alert("삭제 성공");

            const newComments = commentList.filter(comment => comment.id !== id);
            setCommentList(newComments);
        } catch {
            alert("삭제 실패");
        }
    };

    const updateComment = async () => {
        if(editComment.content.trim === "") {
            alert("내용을 입력하세요")
        } else {
            try {
                const response = await api.put(`board/${boardId}/comment`,editComment)
                setCommentList(commentList.map(comment =>
                    comment.id === response.data.id ? response.data : comment));

                setEditingId(null);
                setEditComment({id : null, comment : ""});
                alert("수정 성공")
                onCommentUpdate(); // 댓글 수정 후 콜백 호출
            }catch (error) {
                console.error(error)
                alert("수정 실패")
            }
        }
    }

    const handleEditClick = (id) => {
        const commentToEdit = commentList.find(comment => comment.id === id);
        setEditingId(id);
        setEditComment({ id: id, content: commentToEdit.content });
    };

    const newComment = (newComment) => {
        setCommentList([...commentList, newComment]);
    };

    return (
        <div className={styles.commentContainer}>
            <CommentWrite boardId={boardId} newComment={newComment} />
            <div className={styles.commentList}>
                <p className={styles.commentHeader}>댓글&nbsp;{commentList.length}</p>
                {commentList.slice(0, visible).map((comment) =>
                    editingId === comment.id ? (
                        <div key={comment.id} className={styles.commentItem}>
                            <input
                                type="text"
                                value={editComment.content}
                                onChange={(e) => setEditComment({ id: editingId, content: e.target.value })}
                                className={styles.editInput}
                            />
                            <div className={styles.editActions}>
                                <button onClick={updateComment}>저장</button>
                            </div>
                        </div>
                    ) : (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentHeader}>
                                <div>
                                    <span>{comment.memberNickName}</span>
                                    <span className={styles.createTime}>{comment.createTime}</span>
                                </div>
                                {comment.memberId === myId && (
                                    <div className={styles.commentActions}>
                                        <button onClick={() => handleEditClick(comment.id)}>수정</button>
                                        <button onClick={() => deleteComment(comment.id)}>삭제</button>
                                    </div>
                                )}
                            </div>
                            <p className={styles.commentContent}>{comment.content}</p>
                        </div>
                    )
                )}
                {visible < commentList.length && (
                    <p className={styles.showMore} onClick={showMore}>
                        더보기
                    </p>
                )}
            </div>
        </div>
    );
}

export default Comment;