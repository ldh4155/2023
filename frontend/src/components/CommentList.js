import axios from "axios";
import React, { useState } from 'react';

const CommentList = ({boardId,commentList}) => {
    
    const [localComments, setLocalComments] = useState(commentList);
    const [visible,setVisible] = useState(10);

    const showMore = () => {
        setVisible((prevValue) => prevValue + 10);
    }

    const deleteComment = async(id) => {
        try {
            await axios.delete(`http://localhost:8080/board/${boardId}/comment/${id}`)
            alert("삭제 성공")

            const newComments = localComments.filter(comment => comment.id !== id);
            setLocalComments(newComments);
        } catch {
            alert("삭제 실패")
        }
    }

    const updateForm = () => {

    }

    const updateComment = async(id) => {
        try {
            await axios.put(`http://localhost:8080/board/${boardId}/comment/${id}`)
        } catch(error) {
            alert("수정 실패")
        }
    }
    return (
        <div>
            <p>댓글&nbsp;{localComments.length}</p>
            {localComments.slice(0,visible).map((comment) => (
                <div key={comment.id}>
                    <span>{comment.memberNickName}</span>&nbsp;&nbsp;&nbsp;
                    <span>{comment.createTime}</span>&nbsp;
                    <button onClick={() => updateComment(comment.id)}>수정</button>&nbsp;
                    <button onClick={() => deleteComment(comment.id)}>삭제</button>
                    <p>{comment.content}</p>
                </div>
            ))}
            {visible < localComments.length && (
                <p onClick={showMore}>더보기</p>
            )}
        </div>
    );
}

export default CommentList;