import React, { useEffect, useState } from "react";
import axios from 'axios';

const UserBoardList = () => {
  const [user, setUser] = useState({});
  const [boards,setBoards] = useState([]);
  const id = 2;
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
  }, []);

  return (
    <div>
      <img src={user.image} alt={user.name} />
      <h2>{user.name} ({user.nickname})</h2>
      <p>Phone: {user.phone_number}</p>
      <p>Address: {user.address}</p>
      <p>Manner Temperature: {user.manner_temperature}</p>
      <h2>최근 게시글</h2>
      {boards.length > 0 ? (
        boards.map(board => (
        <div key = {board.id}>
        <p>Title:{board.title}({board.id})</p>
        <p>Content:{board.content}</p>
        <p>View:{board.view}</p>
        <p>create_time:{board.create_time}</p>
        <p>modified_time:{board.modified_time}</p>
        </div>
      ))
      ) : (
        <p>게시글 없음</p>
      )}
    </div>
  );
}

export default UserBoardList;