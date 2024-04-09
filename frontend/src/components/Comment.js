import React, { useState } from 'react';
import CommentWrite from "./CommentWrite";
import { api } from "../api/api";

const Comment = ({boardId, comments}) => {

    const [commentList, setCommentList] = useState(comments);
    const [visible,setVisible] = useState(10);
    const [editingId,setEditingId] = useState(null);
    const [editComment, setEditComment] = useState({
        id: null,
        content: null
    });
    
    const showMore = () => {
        setVisible((prevValue) => prevValue + 10);
    }

    const deleteComment = async(id) => {
        try {
            await api.delete(`board/${boardId}/comment/${id}`)
            alert("삭제 성공")

            const newComments = commentList.filter(comment => comment.id !== id);
           
            setCommentList(newComments);
        } catch {
            alert("삭제 실패")
        }
    }

    const updateComment = async (editComment) => {
        try {
            const response = await api.put(`board/${boardId}/comment`,editComment)
            setCommentList(commentList.map(comment =>
                comment.id === response.data.id ? response.data : comment));

            setEditingId(null);
            setEditComment({id : null, comment : null});
            alert("수정 성공")
        }catch (error) {
            console.error(error)
            alert("수정 실패")
        }
    }

    const handleEditClick = (id) => {
        setEditingId(id);
    }

    const newComment = (newComment) => {
        setCommentList([...commentList, newComment]);
    };

    return (
        <div>
            <CommentWrite boardId={boardId} newComment={newComment}/>
           <div>
              <p>댓글&nbsp;{commentList.length}</p>
              {commentList.slice(0,visible).map((comment) => 
                editingId === comment.id ? (
                  <div>
                    <input type="text" defaultValue={comment.comment} 
                      onChange={(e) => setEditComment({id: editingId, content: e.target.value})}/>
                    <button onClick={() => updateComment(editComment)}>저장</button>
                  </div>
               ) : (
                <div key={comment.id}>
                  <span>{comment.memberNickName}</span>&nbsp;&nbsp;&nbsp;
                  <span>{comment.createTime}</span>&nbsp;
                  <button onClick={() => handleEditClick(comment.id)}>수정</button>&nbsp;
                  <button onClick={() => deleteComment(comment.id)}>삭제</button>
                  <p>{comment.content}</p>
                </div>
            ))}
            {visible < commentList.length && (
                <p onClick={showMore}>더보기</p>
            )}
          </div>
        </div>
    );
}

export default Comment;