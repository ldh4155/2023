import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from "../../api/api";
import styles from '../../style/cssmodule/mypage/MyPage.module.css';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [boards,setBoards] = useState([]);
  const [auctions,setAuctions] = useState([]);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [chargeAmount, setChargeAmount] = useState('');

  useEffect(() => {
    const fetchUserAndBoards = async () => {
      try {
        const userResponse = await api.get(`mypageuser`);
        setUser(userResponse.data);
        const boardsResponse = await api.get(`mypageboard`);
        setBoards(boardsResponse.data);
        const auctionResponse = await api.get(`mypageauctions`);
        setAuctions(auctionResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load user or boards', error);
      }
    };
    fetchUserAndBoards();
  }, []);

  const handleEdit = async () => {
    try {
      const response = await api.put(`mypageuser`, { [editField]: editValue }, {
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
        await api.delete(`mypageuser`);
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file.size > 400 * 400) {
      alert('파일 크기가 너무 큽니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(`mypageuser/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser({ ...user, profileImage: response.data });
    } catch (error) {
      console.error('Failed to upload image', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/mypageuser/balance', chargeAmount,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      alert(`충전이 완료되었습니다. 충전 후 금액: ${response.data}`);
    } catch (error) {
      console.error('오류:', error);
      alert('충전 중 오류가 발생했습니다.');
    }
  };

  if(isLoading) {
    return (
        <div>Loading..</div>
    )
  } else {
    return (
        <div className={styles.containerwrapper}>
          <div className={styles.container1}>
            <label htmlFor="imageUpload">
              <img src={user.imageUrl} alt={user.name} style={{cursor: 'pointer'}}/>
            </label>
            <input id="imageUpload" type="file" style={{display: 'none'}} onChange={handleImageUpload}/>

            <h2 className={styles.header}>
              <div>{user.nickName}</div>
              <button className={styles.button} onClick={() => setEditField('nickName')}>수정</button>
            </h2>
            <p className={styles.body}>
              <div>이름: {user.name}</div>
              <button className={styles.button} onClick={() => setEditField('name')}>수정</button>
            </p>


            {showDetail && (
                <>
                  <p>연락처 : {user.phone}
                    <button className={styles.button} onClick={() => setEditField('phoneNumber')}>수정</button>
                  </p>
                  <p>주소 : {user.address}
                    <button className={styles.button} onClick={() => setEditField('address')}>수정</button>
                  </p>
                  <p>이메일 : {user.email}
                    <button className={styles.button} onClick={() => setEditField('email')}>수정</button>
                  </p>
                  <p>생년월일 : {user.birth}
                    <button className={styles.button} onClick={() => setEditField('birth')}>수정</button>
                  </p>
                  <p>
                    현재 비밀번호 : {showPassword ? user.password : '********'}
                    <button className={styles.button} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '숨기기' : '확인'}</button>
                    <button className={styles.button} onClick={() => setEditField('password')}>비밀번호 변경</button>
                  </p>
                </>
            )}

            <div className="mannerTemperature">
              <p>매너 온도: {user.numberOfTransactions}</p>
              <div className="mannerBarBackground">
                <div
                    className={`mannerBar ${getBarColor(user.numberOfTransactions)}`}
                    style={{
                      width: `${Math.min(user.numberOfTransactions, 100)}%`,
                      backgroundColor: getBarColor(user.numberOfTransactions)
                    }}
                />
              </div>
            </div>
            {editField && (
                <div>
                  <input value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
                  <button className={styles.button} onClick={handleEdit}>변경 적용</button>
                </div>
            )}
            <div className={styles.buttonsContainer}>
              {showDetail ? (
                  <button className={styles.button} onClick={() => setShowDetail(false)}>숨기기</button>
              ) : (
                  <button className={styles.button} onClick={() => setShowDetail(true)}>내 개인정보 확인하기</button>
              )}
              <button className={styles.button} onClick={handleDeleteUser}>회원탈퇴</button>
            </div>
          </div>

          <div className={styles.container2}>

            <h2 className={styles.recentPosts}>최근 게시글</h2>
            {boards.length > 0 ? (
                boards.map(board => (
                    <div key={board.id} className={styles.postItem}>
                      <p>-----------------------------------------------</p>
                      <Link to={`/board/${board.id}`} className={styles.link}>
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
            <div className={styles.container3}>
              <h2>나의 진행중인 경매</h2>
              <div className={styles.auctionList}>
                {auctions.length > 0 ? (
                    auctions.map(auction => (
                        <div key={auction.auctionId} className={styles.auctionContainer}>
                          <div className={styles.auctionDetails}>
                            <Link to={`/auctions/${auction.auctionId}`} className={styles.auctionTitle}>
                              {auction.title}
                            </Link>
                            <div className={styles.auctionPrice}>{"시작가 : " + auction.startPrice}</div>
                          </div>
                          <div className={styles.divider} />
                        </div>
                    ))
                ) : (
                    <p>게시글 없음</p>
                )}
              </div>
          </div>
        </div>
    );


  }
}

export default MyPage;