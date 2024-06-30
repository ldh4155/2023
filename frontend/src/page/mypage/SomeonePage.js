import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { api } from "../../api/api";

const SomeonePage = () => {
  const [user, setUser] = useState({});
  const [boards,setBoards] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserAndBoards = async () => {
      try {
        const userResponse = await api.get(`mypageuser/${id}`);
        setUser(userResponse.data);
        const boardsResponse = await api.get(`mypageboard/${id}`);
        setBoards(boardsResponse.data);
      } catch (error) {
        console.error('Failed to load user or boards', error);
      }
    };

    fetchUserAndBoards();
  }, [id]);
  
  const getBarColor = (temperature) => {
    if (temperature >= 90) {
      return 'red';
    } else if (temperature >= 70) {
      return 'orange';
    } else if (temperature >= 50){
      return 'yellow';
    } else if (temperature >= 30){
      return 'green';
    } else {
      return 'blue';
    }
  };

  return (
    <div>
      <img src={process.env.PUBLIC_URL + '/' + user.profileImage} alt={user.name} />

      <h2>{user.nickName}</h2>
      <p>이름 : {user.name}</p>
      <div style={{ display: 'flex', marginRight: '10px' }}>
        <p>매너 온도: {user.numberOfTransactions}</p>
        <div style={{ 
          width: '300px', 
          height: '20px', 
          backgroundColor: '#eee'
        }}>
          <div style={{ 
            width: `${user.numberOfTransactions}%`, 
            height: '100%', 
            backgroundColor: getBarColor(user.numberOfTransactions)
        }} />
        </div>
      </div>

      <h2>최근 게시글</h2>
      {boards.length > 0 ? (
        boards.map(board => (
        <div key = {board.id}>
          <p>-------------------------------</p>
          <Link to={`/board/${board.id}`}>
              <p>제목:{board.title}({board.id})</p>
          </Link>
          <p>내용:{board.content}</p>
          <p>조회수:{board.view}</p>
          <p>글 작성시각:{board.createTime}</p>
          <p>글 수정시각:{board.modifiedTime}</p>
        </div>
      ))
      ) : (
        <p>게시글 없음</p>
      )}
    </div>
  );
}

export default SomeonePage;