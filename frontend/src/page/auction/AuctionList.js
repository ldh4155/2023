import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api, setAuthToken } from "../../api/api";

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [auctionDto,setAuctionDto] = useState();
  const [title, setTitle] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [AuctionImage, setAuctionImage] = useState(null); // 새 이미지 상태
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    setAuthToken();
    fetchAuctions();
  }, []);

  const isValidToken = (token) => {
    if (!token) {
      setErrorMessage("토큰이 존재하지 않습니다.");
      return false;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      setErrorMessage("JWT 문자열은 정확히 2개의 점(.) 문자를 포함해야 합니다. 발견된 점의 개수: " + (parts.length - 1));
      return false;
    }
    return true;
  };

  const fetchAuctions = async () => {
    if (!isValidToken(token)) return;

    try {
      const response = await api.get('http://localhost:8080/auctions');
      setAuctions(response.data);
      setErrorMessage(''); // 오류 메시지 초기화
    } catch (error) {
      console.error("경매 목록을 불러오는데 오류가 발생했습니다: ", error);
      setErrorMessage("경매 목록을 불러오는데 오류가 발생했습니다.");
    }
  };

  const handleCreateAuction = async (e) => {
    e.preventDefault();
  
    if (!isValidToken(token)) return;
  
    // FormData 객체를 사용하여 파일과 데이터를 함께 서버에 전송
    const formData = new FormData();
    formData.append('title', title);
    formData.append('startPrice', startPrice);
    if (AuctionImage) {
      formData.append('image', AuctionImage);
    }
  
    try {
      const response = await api.post('http://localhost:8080/auctions', formData); // Content-Type 헤더 생략
      setAuctions(prevAuctions => [...prevAuctions, response.data]); // response를 직접 추가하는 대신 response.data를 추가해야 합니다.
      setShowForm(false);
      setTitle('');
      setStartPrice('');
      setAuctionImage(null); // 이미지 상태 초기화
      setErrorMessage(''); // 오류 메시지 초기화
    } catch (error) {
      console.error("경매 등록 중 오류가 발생했습니다: ", error);
      setErrorMessage("경매 등록 중 오류가 발생했습니다.");
    }
  };
    

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    setAuctionImage(e.target.files[0]);
  };

  return (
    <div className="App">
      <h1>경매 목록</h1>
      <button onClick={() => setShowForm(!showForm)}>경매 등록</button>
      {showForm && (
        <form onSubmit={handleCreateAuction}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="경매 제목"
            required
          />
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            placeholder="시작 가격"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
          <button type="submit">등록</button>
        </form>
      )}
      <ul>
        {auctions.map(auctions => (
          <li key={auctions.auctionId}>
            <Link to={`/auctions/${auctions.auctionId}`}>{auctions.title}</Link> {/* 각 경매 상세 페이지로 이동 */}
            {auctions.imageUrl && (
              <img src={auctions.imageUrl} alt="Auction" style={{ width: '100px', height: '100px' }} />
            )}
            <p>{"시작가 : " + auctions.startPrice}</p>
            <p>{"현재 최고가 : " + (auctions.amount ? auctions.amount : "미입찰")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionList;