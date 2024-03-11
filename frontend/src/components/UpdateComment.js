import { useState } from "react";


const updateComment = () => {
    
    const [newComment, setNewComment] = useState('');

    const updateHandle = async () => {
        event.preventDefault();

        try {
            //
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
        <form>
            <input type="text" value={newComment}/>
            <button type="submit">확인</button>
        </form>
    );
}

export default updateComment;