import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserBoardList = () => {
  const [user, setUser] = useState({});
  const [boards,setBoards] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserAndBoards = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/mypageuser/${id}`);
        setUser(userResponse.data);
        const boardsResponse = await axios.get(`http://localhost:8080/mypageboard/${id}`);
        setBoards(boardsResponse.data);
      } catch (error) {
        console.error('Failed to load user or boards', error);
      }
    };

    fetchUserAndBoards();
  }, [id]);

  return (
    <div>
      <img src={user.image} alt={user.name} />
      <h2>{user.nickname}</h2>
      <p>이름 : {user.name}</p>
      <p>연락처 : {user.phoneNumber}</p>
      <p>주소 : {user.address}</p>
      <p>매너 온도: {user.mannerTemperature}</p>
      <h2>최근 게시글</h2>
      {boards.length > 0 ? (
        boards.map(board => (
        <div key = {board.id}>
          <p>-------------------------------</p>
          <p>Title:{board.title}({board.id})</p>
          <p>Content:{board.content}</p>
          <p>View:{board.view}</p>
          <p>create_time:{board.createTime}</p>
          <p>modified_time:{board.modifiedTime}</p>
        </div>
      ))
      ) : (
        <p>게시글 없음</p>
      )}
    </div>
  );
}

export default UserBoardList;