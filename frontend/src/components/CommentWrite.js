import axios from "axios";
import React, { useState } from 'react';

const CommentWrite = ({boardId, newComment}) => {

    const [comment, setComment] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //댓글 보내기
           const response =  await axios.post(
            `http://localhost:8080/board/${boardId}/comment`
            , {content: comment});

            setComment('');
            newComment(response.data);
        } catch(error) {
            alert("댓글 작성에 실패");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea 
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="댓글 입력"/>

                <button type="submit">댓글 작성</button> 
            </form>
        </div>
    )
}

export default CommentWrite;