import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MyPage = () => {
  const [user, setUser] = useState({ profileImage: process.env.PUBLIC_URL + '/logo192.png' });
  const [boards,setBoards] = useState([]);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  let token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUserAndBoards = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/mypageuser/${token}`);
        setUser(userResponse.data);
        const boardsResponse = await axios.get(`http://localhost:8080/mypageboard/${token}`);
        setBoards(boardsResponse.data);
      } catch (error) {
        console.error('Failed to load user or boards', error);
      }
    };

    fetchUserAndBoards();
  }, [token]);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/mypageuser/${token}`, { [editField]: editValue }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      setUser(response.data);
      setEditValue('');
      setEditField('');
    } catch (error) {
      console.error('Failed to edit user', error);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8080/mypageuser/${token}`);
        window.location.href = '/';
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

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

  const handleImageUpload = async (event,token) => {
    const file = event.target.files[0];
    
    if (file.size > 250 * 1024) {
      alert('파일 크기가 너무 큽니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8080/mypageuser/${token}/upload`, formData); // Content-Type 제거
      if (response.data && response.data.profileImage) { // 응답 데이터 검증 수정
        setUser({ ...user, profileImage: response.data.profileImage });
      } else {
        alert('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to upload image', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <label htmlFor="imageUpload">
        <img src={process.env.PUBLIC_URL + '/' + user.profileImage.profileImage} alt={user.id} style={{ cursor: 'pointer' }} />
      </label>
      <input id="imageUpload" type="file" style={{ display: 'none' }} onChange={handleImageUpload} />

      <h2>{user.nickName}
        <button onClick={() => setEditField('nickName')}>수정</button>
      </h2>
      <p>이름 : {user.name} 
        <button onClick={() => setEditField('name')}>수정</button>
      </p>
      {showDetail && (
        <>
        <p>연락처 : {user.phoneNumber} 
        <button onClick={() => setEditField('phoneNumber')}>수정</button>
      </p>
      <p>주소 : {user.address} 
        <button onClick={() => setEditField('address')}>수정</button>
      </p>
      <p>이메일 : {user.email} 
        <button onClick={() => setEditField('email')}>수정</button>
      </p>
      <p>생년월일 : {user.birth} 
        <button onClick={() => setEditField('birth')}>수정</button>
      </p>
      <p>
        현재 비밀번호 : {showPassword ? user.password : '********'}
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '숨기기' : '확인'}</button>
          <button onClick={() => setEditField('password')}>비밀번호 변경</button>
      </p>
        </>
      )}
      {editField && (
        <div>
          <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
          <button onClick={handleEdit}>변경 적용</button>
        </div>
      )}
      {showDetail ? (
        <button onClick={() => setShowDetail(false)}>숨기기</button>
      ) : (
        <button onClick={() => setShowDetail(true)}>내 개인정보 확인하기</button>
      )}
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
      <button onClick={handleDeleteUser}>회원탈퇴</button>
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

export default MyPage;