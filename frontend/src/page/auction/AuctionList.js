import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [showForm, setShowForm] = useState(false); // 폼 표시 상태
  const [newAuctionTitle, setNewAuctionTitle] = useState('');
  const [newAuctionStartPrice, setNewAuctionStartPrice] = useState('');
  const token = localStorage.getItem('Authorization');
  

  useEffect(() => {
    fetchAuctions();
  }, []);

  const isValidToken = (token) => {
    if (!token) {
      console.log("토큰이 존재하지 않습니다.");
      return false;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log("토큰 형식이 올바르지 않습니다.");
      return false;
    }
    return true;
  };

  const fetchAuctions = async () => {
  if (!isValidToken(token)) return; // 여기서 토큰 유효성 검사

  try {
    const response = await axios.get('http://localhost:8080/auctions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setAuctions(response.data);
  } catch (error) {
    console.error("Error fetching auctions: ", error);
  }
  };

  const handleCreateAuction = async (e) => {
    e.preventDefault();
  
    if (!isValidToken(token)) return; // 여기서 토큰 유효성 검사
  
    try {
      const { data: newAuction } = await axios.post('http://localhost:8080/auctions', {
        title: newAuctionTitle,
        startPrice: newAuctionStartPrice
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAuctions(prevAuctions => [...prevAuctions, newAuction]);
      setShowForm(false);
      setNewAuctionTitle('');
      setNewAuctionStartPrice('');
    } catch (error) {
      console.error("Error creating auction: ", error);
      // 여기서 사용자에게 에러 메시지를 보여주는 로직 추가
    }
  };

  return (
    <div className="App">
      <h1>경매 목록</h1>
      <button onClick={() => setShowForm(!showForm)}>경매 등록</button> {/* 폼 표시/숨기기 */}
      {showForm && ( // 폼 표시 상태일 때만 렌더링
        <form onSubmit={handleCreateAuction}>
          <input
            type="text"
            value={newAuctionTitle}
            onChange={(e) => setNewAuctionTitle(e.target.value)}
            placeholder="경매 제목"
            required
          />
          <input
            type="number"
            value={newAuctionStartPrice}
            onChange={(e) => setNewAuctionStartPrice(e.target.value)}
            placeholder="시작 가격"
            required
          />
          <button type="submit">등록</button>
        </form>
      )}
      <ul>
        {auctions.map(auction => (
          <li key={auction.id}>
            <Link to={`/auction/${auction.id}`}>{auction.title}</Link> {/* 각 경매 상세 페이지로 이동 */}
            <p>{"시작가 : " + auction.startPrice}</p>
            <p>{"현재 최고가 : " + auction.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionList;