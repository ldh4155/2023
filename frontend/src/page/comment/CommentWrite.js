import React, { useState } from 'react';
import { api } from "../../api/api";
import styles from '../../style/cssmodule/component/Commentwrite.module.css';

const CommentWrite = ({boardId, newComment}) => {

    const [comment, setComment] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //댓글 보내기
           const response =  await api.post(`board/${boardId}/comment`
            , {content: comment});

            setComment('');
            newComment(response.data);
        } catch(error) {
            alert("댓글 작성에 실패");
        }
    }
    return (
        <div className={styles.commentForm}>
            <form onSubmit={handleSubmit}>
        <textarea
            className={styles.commentTextarea}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="댓글 입력"
        />
                <button type="submit" className={styles.commentButton}>
                    댓글 작성
                </button>
            </form>
        </div>
    );
}

export default CommentWrite;